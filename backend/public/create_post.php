<?php
session_start();

// Configurações de CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Inclui a conexão com o banco de dados
require_once '../config/database.php';

// Responde ao preflight request (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Verifica se o método é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

// Verifica se o usuário está autenticado
if (!isset($_SESSION['user_id'])) {
    error_log("Usuário não autenticado: ". json_encode($_SESSION));
    echo json_encode(["error" => "Usuário não autenticado"]);
    exit;
}

// Conexão com o banco de dados
$database = new Database();
$conn = $database->getConnection();

// Verifica se a conexão foi estabelecida corretamente
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

try {
    // Pega os dados da requisição
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    
    // Log para verificação dos dados recebidos
    error_log("Dados recebidos: Título = $title, Descrição = $description");

    $user_id = $_SESSION['user_id'];

    // Processamento da imagem
    $image = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['image']['name'];
        $target_dir = "../uploads/"; // Ajustar o caminho correto para salvar a imagem
        $target_file = $target_dir . basename($image);
        
        // Verifica se o diretório existe, se não, cria
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            echo json_encode(["error" => "Falha ao mover a imagem para o diretório de uploads."]);
            exit;
        }
    }

    // Verifica se os dados obrigatórios estão preenchidos
    if (empty($title) || empty($description)) {
        echo json_encode(["error" => "Título e descrição são obrigatórios."]);
        exit;
    }

    // Insere no banco de dados
    $query = "INSERT INTO posts (user_id, title, description) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "iss", $user_id, $title, $description);

    if (mysqli_stmt_execute($stmt)) {
        $newPostId = mysqli_insert_id($conn);
        error_log("Novo post inserido: ID = $newPostId");

        // Inserir a imagem separadamente na tabela post_images, se houver
        if ($image) {
            $imageQuery = "INSERT INTO post_images (post_id, image_url) VALUES (?, ?)";
            $imageStmt = mysqli_prepare($conn, $imageQuery);
            mysqli_stmt_bind_param($imageStmt, "is", $newPostId, $image);
            mysqli_stmt_execute($imageStmt);
            mysqli_stmt_close($imageStmt);
        }

        $response = [
            'id' => $newPostId,
            'title' => $title,
            'description' => $description,
            'image' => $image,
        ];
        echo json_encode($response);
    } else {
        error_log("Erro ao inserir post: " . mysqli_error($conn));
        echo json_encode(["error" => "Falha ao criar o post: ". mysqli_error($conn)]);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} catch (Exception $e) {
    error_log("Erro inesperado: " . $e->getMessage());
    echo json_encode(["error" => "Erro inesperado: " . $e->getMessage()]);
}
?>

<?php
session_start();

// Configurações de CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Permite o uso de cookies
header("Content-Type: application/json");

// Responde ao preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Verifica se o método é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica se o usuário está autenticado
    if (!isset($_SESSION['user_id'])) {
        error_log("Usuário não autenticado: " . json_encode($_SESSION)); // Para debugging
        echo json_encode(["error" => "Usuário não autenticado"]);
        exit;
    }

    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $user_id = $_SESSION['user_id'];

    // Processamento da imagem
    $image = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['image']['name'];
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($image);
        
        // Verifica se o diretório existe, senão, cria
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            echo json_encode(["error" => "Falha ao mover a imagem para o diretório de uploads."]);
            exit;
        }
    }

    // Inserir no banco de dados
    require_once('../config/database.php'); // Mova isso para o início do arquivo
    $query = "INSERT INTO posts (user_id, title, description, image) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "isss", $user_id, $title, $description, $image);

    if (mysqli_stmt_execute($stmt)) {
        $newPostId = mysqli_insert_id($conn);
        $response = [
            'id' => $newPostId,
            'title' => $title,
            'description' => $description,
            'image' => $image,
            'created_at' => date('Y-m-d H:i:s'),
        ];
        echo json_encode($response);
    } else {
        echo json_encode(["error" => "Falha ao criar o post: " . mysqli_error($conn)]);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
}
?>

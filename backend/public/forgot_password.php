<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Responder a requisições OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

require '../config/database.php';  // Conexão com o banco de dados

// Inicializa a conexão
$database = new Database();
$conn = $database->getConnection();

// Verifica se a conexão foi estabelecida
if ($conn === null) {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao conectar ao banco de dados."
    ]);
    exit; // Sai se a conexão falhar
}

// Pega os dados da requisição
$data = json_decode(file_get_contents("php://input"));

// Recupera o número de telefone do JSON
$telefone = $data->phone ?? '';

// Verifica se o número de telefone foi fornecido
if (!empty($telefone)) {
    // Prepara a consulta para buscar o usuário pelo telefone
    $query = "SELECT * FROM users WHERE phone = ?";
    $stmt = $conn->prepare($query);

    // Verifica se a preparação da consulta falhou
    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Erro ao preparar a consulta: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("s", $telefone);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verifica se o usuário foi encontrado
    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();

        // Retorna todas as informações necessárias
        echo json_encode([
            "success" => true,
            "username" => $usuario['username'], // Adicione o nome de usuário
            "phone" => $usuario['phone'],       // Adicione o telefone
            "password" => $usuario['password'] // Remova esta linha
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Número de telefone não encontrado."
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        "success" => false,
        "message" => "Número de telefone não fornecido."
    ]);
}

// Fecha a conexão com o banco de dados
$conn->close();
?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../config/database.php';

// Pega os dados da requisição
$data = json_decode(file_get_contents("php://input"));

// Verifica se os dados estão definidos
if (!isset($data->name, $data->phone, $data->password)) {
    echo json_encode(["message" => "Todos os campos são obrigatórios"]);
    exit;
}

$name = $data->name;
$phone = $data->phone;
$password = $data->password; // Armazena a senha em texto claro

// Verifica se os campos não estão vazios
if (empty($name) || empty($phone) || empty($password)) {
    echo json_encode(["message" => "Campos inválidos"]);
    exit;
}

// Verifica se o número de telefone já está em uso
$query = "SELECT id FROM users WHERE phone = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $phone);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["message" => "Número de telefone já cadastrado"]);
    $stmt->close();
    $conn->close();
    exit;
}

// Prepara a consulta para inserir os dados no banco
$query = "INSERT INTO users (username, password, phone) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("sss", $name, $password, $phone);

if ($stmt->execute()) {
    echo json_encode(["message" => "Usuário registrado com sucesso"]);
} else {
    echo json_encode(["message" => "Erro ao registrar usuário"]);
}

$stmt->close();
$conn->close();

?>

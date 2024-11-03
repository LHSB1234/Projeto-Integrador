<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../config/database.php';

$database = new Database();
$conn = $database->getConnection();

if ($conn === null) {
    echo json_encode(["success" => false, "message" => "Erro ao conectar ao banco de dados"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->name, $data->phone, $data->password)) {
    echo json_encode(["success" => false, "message" => "Todos os campos são obrigatórios"]);
    exit;
}

$name = $data->name;
$phone = $data->phone;
$password = $data->password;

if (empty($name) || empty($phone) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Campos inválidos"]);
    exit;
}

$query = "SELECT id FROM users WHERE phone = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $phone);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Número de telefone já cadastrado"]);
    $stmt->close();
    $conn->close();
    exit;
}

$query = "INSERT INTO users (username, password, phone) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("sss", $name, $password, $phone);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Usuário registrado com sucesso"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao registrar usuário"]);
}

$stmt->close();
$conn->close();

?>

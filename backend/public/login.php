<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Usuário não autenticado"]);
    exit;
}

require '../config/database.php';

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$phone = $data->phone ?? '';
$password = $data->password ?? '';

if (!empty($phone) && !empty($password)) {
    $query = "SELECT * FROM users WHERE phone = ?";
    $stmt = $conn->prepare($query);
    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Erro ao preparar a consulta."]);
        exit;
    }
    
    $stmt->bind_param("s", $phone);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if ($password == $user['password']) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            echo json_encode([
                "success" => true,
                "username" => $user['username'],
                "message" => "Login realizado com sucesso."
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Usuário ou senha incorretos."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Usuário ou senha incorretos."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Campos obrigatórios não preenchidos."]);
}

$conn->close();
?>

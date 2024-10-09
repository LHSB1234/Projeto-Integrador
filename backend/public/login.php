<?php
session_start(); // Certifique-se de que a sessão está iniciada
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

require '../config/database.php';

$data = json_decode(file_get_contents("php://input"));

$phone = $data->phone ?? '';
$password = $data->password ?? '';

if (!empty($phone) && !empty($password)) {
    $query = "SELECT * FROM users WHERE phone = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $phone);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verifique se a senha corresponde (use password_verify)
        if (password_verify($password, $user['password'])) { // Aqui
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            echo json_encode([
                "success" => true,
                "username" => $user['username']
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

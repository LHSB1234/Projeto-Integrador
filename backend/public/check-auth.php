<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => true,
        "user_id" => $_SESSION['user_id'],
        "username" => $_SESSION['username']
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Usuário não autenticado"
    ]);
}
?>

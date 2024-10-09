<?php
session_start(); // Garante que a sessão esteja iniciada
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Verificar se o usuário está autenticado
if (isset($_SESSION['username'])) {
    echo json_encode([
        'authenticated' => true,
        'username' => $_SESSION['username']
    ]);
} else {
    echo json_encode(['authenticated' => false]);
}
?>

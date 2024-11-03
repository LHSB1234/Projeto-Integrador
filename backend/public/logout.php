<?php
// Iniciar a sessão
session_start();

// Definir cabeçalhos de CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); // Certifique-se de que essa URL é a do seu frontend
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Lidar com requisições OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // Sem conteúdo
    exit;
}

// Lógica de logout
if (isset($_SESSION['username'])) {
    unset($_SESSION['username']); // Remove o usuário da sessão
    session_destroy(); // Destrói a sessão
    echo json_encode(['success' => true, 'message' => 'Logout realizado com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuário não autenticado']);
}
?>

<?php
require '../controllers/PostController.php';

// Ativar exibição de erros para depuração
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Se o método for OPTIONS, retorne 204
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Instancia o controlador
$controller = new PostController();

// Obtém os posts
$controller->getPosts(); // Chame o método para obter posts
?>

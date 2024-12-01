<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../config/database.php';  // Conexão com o banco de dados
require '../controllers/PostController.php';  // Controle de posts

// Instancia o controlador de posts
$controller = new PostController();

// Chama o método para obter os posts
$controller->getPosts();  // Este método já vai retornar o JSON
?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../config/database.php';  // Conexão com o banco de dados
require '../controllers/PostController.php';  // Controle de posts

// Instancia o controlador de posts e obtém os posts
$controller = new PostController();
$posts = $controller->getPosts();

// Retorna os posts como JSON
echo json_encode($posts);

?>

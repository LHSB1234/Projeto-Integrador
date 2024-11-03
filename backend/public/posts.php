<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluir a classe Database
require_once('../config/database.php');

// Instanciar a classe Database e obter a conexão
$database = new Database();
$connection = $database->getConnection();

// Verificar se a conexão foi estabelecida
if (!$connection) {
    echo json_encode(["error" => "Falha na conexão com o banco de dados"]);
    exit;
}

$query = "SELECT * FROM posts";
$result = mysqli_query($connection, $query);

// Adicionando debug para verificar a consulta
if (!$result) {
    echo json_encode(["error" => "Falha na consulta: " . mysqli_error($connection)]);
    exit;
}

$posts = [];
while ($row = mysqli_fetch_assoc($result)) {
    // Alterar para incluir o caminho completo da imagem
    $row['images'] = []; // Inicializando o array de imagens
    $imageQuery = "SELECT image_url FROM post_images WHERE post_id = ?";
    $stmtImages = $connection->prepare($imageQuery);
    $stmtImages->bind_param('i', $row['id']);
    $stmtImages->execute();
    $imageResult = $stmtImages->get_result();

    while ($imageRow = $imageResult->fetch_assoc()) {
        $row['images'][] = "http://localhost/4SM/pj2/pj2/backend/uploads/" . $imageRow['image_url'];
    }

    $posts[] = $row;
}

// Verificar o conteúdo de $posts
error_log("Posts retornados: " . json_encode($posts));
echo json_encode($posts);

mysqli_close($connection);
?>

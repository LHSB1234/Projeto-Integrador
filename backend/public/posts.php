<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once('../config/database.php'); 

$query = "SELECT * FROM posts";
$result = mysqli_query($connection, $query);

if ($result) {
    $posts = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $posts[] = $row;
    }
    echo json_encode($posts);
} else {
    echo json_encode(["error" => "Falha ao buscar posts"]);
}

mysqli_close($connection);
?>

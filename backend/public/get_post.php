<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $postId = $_GET['id'];

    // Consulta para buscar o post pelo ID
    $query = "SELECT * FROM posts WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $postId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $post = $result->fetch_assoc();

        // Consulta para obter as imagens associadas ao post
        $imageQuery = "SELECT image_url FROM post_images WHERE post_id = ?";
        $stmtImages = $conn->prepare($imageQuery);
        $stmtImages->bind_param('i', $postId);
        $stmtImages->execute();
        $imageResult = $stmtImages->get_result();

        $images = [];
        while ($imageRow = $imageResult->fetch_assoc()) {
            $images[] = $imageRow['image_url'];
        }

        $post['images'] = $images;

        echo json_encode($post);
    } else {
        echo json_encode(['error' => 'Post não encontrado']);
    }

    $stmt->close();
    $conn->close();
}
?>

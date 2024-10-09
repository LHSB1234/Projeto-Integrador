<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
class Post {
    private $conn;
    private $table_name = "posts";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($user_id, $title, $description) {
        $query = "INSERT INTO " . $this->table_name . " (user_id, title, description) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);

        $stmt->bind_param("iss", $user_id, $title, $description);

        if ($stmt->execute()) {
            return $this->conn->insert_id; // Retorna o ID do post recém-criado
        } else {
            return false;
        }
    }
}

?>

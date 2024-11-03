<?php
class Database {
    private $host = "localhost";
    private $db_name = "BdBlog";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
            if ($this->conn->connect_error) {
                throw new Exception("Conexão falhou: " . $this->conn->connect_error);
            }
        } catch (Exception $exception) {
            echo "Erro de conexão: " . $exception->getMessage();
        }
        return $this->conn;
    }
}

// Crie uma instância do banco de dados e obtenha a conexão
$database = new Database();
$conn = $database->getConnection();
?>

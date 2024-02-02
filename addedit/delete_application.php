<?php
$host = 'localhost';
$user = 'root';
$password = 'Qw3rty123?';
$db = 'devopsdev';

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$id = $_POST['id'];

$sql = "DELETE FROM applications WHERE Id = $id";

if ($conn->query($sql) === TRUE) {
    echo 'Application deleted successfully';
} else {
    echo 'Error deleting application: ' . $conn->error;
}

$conn->close();
?>


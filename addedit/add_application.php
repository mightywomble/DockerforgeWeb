<?php
$host = 'localhost';
$user = 'root';
$password = 'Qw3rty123?';
$db = 'devopsdev';

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$appName = $_POST['appName'];
$appVersion = $_POST['appVersion'];
$appCmd = $_POST['appCmd'];

$sql = "INSERT INTO applications (application, version, run) VALUES ('$appName', '$appVersion', '$appCmd')";

if ($conn->query($sql) === TRUE) {
    echo 'Application added successfully';
} else {
    echo 'Error adding application: ' . $conn->error;
}

$conn->close();
?>

<?php
$host = 'localhost';
$user = 'root';
$password = 'Qw3rty123?';
$db = 'devopsdev';

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$sql = "SELECT ID, application, version, run FROM applications"; // Replace column names as per your table structure
$result = $conn->query($sql);

$applications = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }
}

echo json_encode($applications);

$conn->close();
?>


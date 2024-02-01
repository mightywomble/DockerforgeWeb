<?php
// Database configuration
$host = 'localhost';
$username = 'root';
$password = 'Qw3rty123?';
$database = 'devopsdev';

// Create a new database connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch the data from the database
$sql = "SELECT * FROM applications ORDER BY application ASC";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

// Close the database connection
$conn->close();

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
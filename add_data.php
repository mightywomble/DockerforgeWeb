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

// Retrieve the data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Insert the new data into the database
$sql = "INSERT INTO applications (application, version, run) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $data['application'], $data['version'], $data['run']);
$stmt->execute();

// Get the ID of the newly inserted row
$insertId = $stmt->insert_id;

// Close the database connection
$stmt->close();
$conn->close();

// Return the ID of the newly inserted row as JSON
header('Content-Type: application/json');
echo json_encode(array('id' => $insertId));
?>
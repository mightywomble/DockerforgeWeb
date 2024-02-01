<?php

include 'db-connection.php';

// Create a new database connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the updated data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Extract the values from the data
$id = $data['id'];
$application = $data['application'];
$version = $data['version'];
$run = $data['run'];

// Prepare the update statement
$sql = "UPDATE applications SET application = ?, version = ?, run = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $application, $version, $run, $id);

// Execute the update statement
if ($stmt->execute()) {
    // Update successful
    $response = ['success' => true];
} else {
    // Update failed
    $response = ['success' => false, 'error' => $conn->error];
}

// Add debug output
error_log(json_encode($response));

// Close the statement and database connection
$stmt->close();
$conn->close();

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
<?php

$host = 'localhost';
$dbname = 'devopsdev';
$username = 'root';
$password = 'Qw3rty123?';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
  }

// Get the JSON payload sent from the client
$requestPayload = json_decode(file_get_contents('php://input'), true);

// Check if the "id" field is present in the payload
if (isset($requestPayload['id'])) {
  $id = $requestPayload['id'];

  // Prepare and execute the DELETE statement
  $stmt = $pdo->prepare('DELETE FROM applications WHERE id = :id');
  $stmt->bindParam(':id', $id);
  $stmt->execute();

  // Check if the row was deleted successfully
  if ($stmt->rowCount() > 0) {
    $response = ['success' => true];
  } else {
    $response = ['success' => false, 'error' => 'Row not found'];
  }
} else {
  $response = ['success' => false, 'error' => 'Missing or invalid ID'];
}

// Send the response back to the client
header('Content-Type: application/json');
echo json_encode($response);

?>

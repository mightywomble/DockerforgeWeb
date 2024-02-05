<?php
$servername = "localhost";
$username = "root";
$password = "Qw3rty123?";
$dbname = "devopsdev";

// Create a new PDO object
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

// Set PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    // Retrieve applications and versions from the database
    $sql = "SELECT DISTINCT application FROM applications";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $applications = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $data = [];

    foreach ($applications as $application) {
        $appData = ['application' => $application, 'versions' => []];

        $sql = "SELECT version, run FROM applications WHERE application = :application";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':application', $application);
        $stmt->execute();
        $versions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($versions as $version) {
            $appData['versions'][] = $version;
        }

        $data[] = $appData;
    }

    // Convert data to JSON and send the response
    header('Content-Type: application/json');
    echo json_encode($data);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
?>

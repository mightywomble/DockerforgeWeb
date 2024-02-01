<?php
$servername = "localhost";
$username = "root";
$password = "Qw3rty123?";
$dbname = "devopsdev";

// Create a new PDO object
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

// Set PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Retrieve form data
$application = $_POST['application'];
$version = $_POST['version'];
$run = $_POST['run']; // Add this line to retrieve the 'run' field

try {
    // Check for duplicate data
    $sql = "SELECT COUNT(*) FROM applications WHERE application = :application AND version = :version";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':application', $application);
    $stmt->bindParam(':version', $version);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        echo "Duplicate entry found. Data already exists.";
    } else {
        // Prepare SQL statement
        $sql = "INSERT INTO applications (application, version, run) VALUES (:application, :version, :run)";
        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bindParam(':application', $application);
        $stmt->bindParam(':version', $version);
        $stmt->bindParam(':run', $run);

        // Execute the statement
        $stmt->execute();

        echo "New record created successfully";
    }
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
?>


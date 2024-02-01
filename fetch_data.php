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
    // Retrieve application data
    $sql = "SELECT application, version, run FROM applications";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $applications = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Group applications by name
    $groupedApplications = [];
    foreach ($applications as $app) {
        $application = $app['application'];
        $version = $app['version'];
        $run = $app['run'];

        if (!isset($groupedApplications[$application])) {
            $groupedApplications[$application] = [
                'application' => $application,
                'versions' => [],
                'run' => $run
            ];
        }

        $groupedApplications[$application]['versions'][] = [
            'version' => $version
        ];
    }

    // Convert the grouped applications to a simple array
    $result = array_values($groupedApplications);

    // Return the result as JSON
    header('Content-Type: application/json');
    echo json_encode($result);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
?>


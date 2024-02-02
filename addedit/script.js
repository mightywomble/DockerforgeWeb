// Add Application Form Submit
document.getElementById('addForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var appName = document.getElementById('appName').value;
    var appVersion = document.getElementById('appVersion').value;
    var appCmd = document.getElementById('appCmd').value;

    // Send the form data to a PHP script for processing
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'add_application.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Refresh the application list after successful addition
            fetchApplications();
        } else {
            alert('Error adding application. Please try again.');
        }
    };
    xhr.send('appName=' + encodeURIComponent(appName) + '&appVersion=' + encodeURIComponent(appVersion) + '&appCmd=' + encodeURIComponent(appCmd
));
});

// Fetch Applications
function fetchApplications() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_applications.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var applications = JSON.parse(xhr.responseText);
            updateApplicationList(applications);
        } else {
            alert('Error fetching applications. Please try again.');
        }
    };
    xhr.send();
}

// Update Application List
function updateApplicationList(applications) {
    var table = document.getElementById('appTable');
    table.innerHTML = '<tr><th>ID</th><th>Application</th><th>Version</th><th>Run</th><th>Actions</th></tr>';

    applications.forEach(function (application) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + application.ID + '</td><td>' + application.application + '</td><td>' + application.version + '</td><td>' + application.run + '</td><td><button onclick="deleteApplication(' + application.ID + ')">Delete</button></td>';
        table.appendChild(row);
    });
}

// Delete Application
function deleteApplication(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete_application.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            fetchApplications(); // Refresh the application list after successful deletion
        } else {
            alert('Error deleting application. Please try again.');
        }
    };
    xhr.send('id=' + encodeURIComponent(id));
}

// Fetch applications on page load
fetchApplications();


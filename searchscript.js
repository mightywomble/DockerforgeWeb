var selectedApplications = []; // Store the selected applications across searches

function searchApplications() {
  var searchInput = document.getElementById('search-input');
  var searchQuery = searchInput.value.toLowerCase();

  // Send the search query to the server to fetch matching applications
  fetch('/search?query=' + encodeURIComponent(searchQuery))
    .then(function(response) {
      return response.json();
    })
    .then(function(applications) {
      var appContainer = document.getElementById('app-container');
      appContainer.innerHTML = '';

      // Generate application elements for each matching application
      applications.forEach(function(application) {
        var appBox = document.createElement('div');
        appBox.classList.add('app-box');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = application.id;
        checkbox.checked = isSelected(application.id); // Check if application is selected
        checkbox.addEventListener('change', function() {
          toggleSelection(application.id, this.checked); // Toggle application selection
        });
        appBox.appendChild(checkbox);

        var heading = document.createElement('h3');
        heading.textContent = application.name;
        appBox.appendChild(heading);

        var versionSelect = document.createElement('select');
        versionSelect.id = 'version-select-' + application.id;
        // Generate version options for the application
        application.versions.forEach(function(version) {
          var option = document.createElement('option');
          option.value = version;
          option.textContent = version;
          versionSelect.appendChild(option);
        });
        appBox.appendChild(versionSelect);

        var selectButton = document.createElement('button');
        selectButton.textContent = 'Select';
        selectButton.addEventListener('click', function() {
          selectApplication(application.id, versionSelect.value); // Select the application with the chosen version
        });
        appBox.appendChild(selectButton);

        appContainer.appendChild(appBox);
      });
    });
}

function isSelected(applicationId) {
  // Check if an application is selected
  return selectedApplications.some(function(app) {
    return app.id === applicationId;
  });
}

function toggleSelection(applicationId, isChecked) {
  if (isChecked) {
    // Add the application to the selected list
    var application = { id: applicationId };
    selectedApplications.push(application);
  } else {
    // Remove the application from the selected list
    var index = selectedApplications.findIndex(function(app) {
      return app.id === applicationId;
    });
    if (index !== -1) {
      selectedApplications.splice(index, 1);
    }
  }
}

function selectApplication(applicationId, version) {
  // Update the selected version for the application
  var application = selectedApplications.find(function(app) {
    return app.id === applicationId;
  });
  if (application) {
    application.version = version;
  }
}

function generateDockerfile() {
  // Send the selected applications to the server to generate the Dockerfile
  fetch('/generate-dockerfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selectedApplications)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(dockerfileContent) {
      var outputElement = document.getElementById('output');
      outputElement.textContent = dockerfileContent;
    });
}


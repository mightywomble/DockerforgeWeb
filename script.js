var data;
var runCommands;
var baseImages = [
  'mightywomble/dockerforgebase_ubuntu:latest',
  'mightywomble/dockerforgebase_fedora:latest',
];
var appContainer = document.getElementById('app-container'); // Declare appContainer outside of the fetch block

function showRunCommand(selectElement) {
  var index = selectElement.id.split('-')[2];
  var version = selectElement.value;
  var runCommand = runCommands[version];

  var configOutput = document.getElementById('config-output');
  configOutput.textContent = `Run command for Application ${index + 1} - Version ${version}: ${runCommand}`;
}

function generateConfig() {
  var selectedVersions = [];
  var checkboxes = document.querySelectorAll('.app-checkbox');
  checkboxes.forEach(function (checkbox, index) {
    if (checkbox.checked) {
      var versionSelect = document.getElementById('version-select-' + index);
      var version = versionSelect.value;
      var appName = data[index].application;
      var runCommand = runCommands[version];

      selectedVersions.push({
        application: appName,
        version: version,
        runCommand: runCommand,
      });
    }
  });

  var baseImageSelect = document.getElementById('base-image-select');
  var baseImage = baseImageSelect.value;

  var dockerfileContent = `FROM ${baseImage}\n\n`;
  selectedVersions.forEach(function (selectedVersion) {
    dockerfileContent += `# ${selectedVersion.application} - Version ${selectedVersion.version}\n`;
    dockerfileContent += `RUN ${selectedVersion.runCommand}\n\n`;
  });

  // Create a download link
  var downloadLink = document.createElement('a');
  downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(dockerfileContent);
  downloadLink.download = 'Dockerfile';
  downloadLink.textContent = 'Download Dockerfile';

  var configOutput = document.getElementById('config-output');
  configOutput.innerHTML = ''; // Clear previous content

  // Display the Dockerfile content
  var dockerfileContentElement = document.createElement('pre');
  dockerfileContentElement.textContent = dockerfileContent;

  configOutput.appendChild(dockerfileContentElement);
  configOutput.appendChild(downloadLink);
}

fetch('data.php')
  .then(function (response) {
    return response.json();
  })
  .then(function (fetchedData) {
    data = fetchedData;

    var baseImageSelect = document.createElement('select');
    baseImageSelect.id = 'base-image-select';

    baseImages.forEach(function (image) {
      var option = document.createElement('option');
      option.value = image;
      option.textContent = image;
      baseImageSelect.appendChild(option);
    });

    appContainer.appendChild(baseImageSelect);

    data.forEach(function (application, index) {
      var appRow = document.createElement('div');
      appRow.classList.add('app-row');

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'checkbox-' + index;
      checkbox.classList.add('app-checkbox');
      appRow.appendChild(checkbox);

      var appName = document.createElement('span');
      appName.textContent = application.application;
      appName.classList.add('app-name');
      appRow.appendChild(appName);

      var versionSelect = document.createElement('select');
      versionSelect.id = 'version-select-' + index;
      versionSelect.addEventListener('change', function () {
        showRunCommand(this);
      });
      versionSelect.classList.add('app-dropdown');

      var defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Select Version';
      versionSelect.appendChild(defaultOption);

      application.versions.forEach(function (version) {
        var option = document.createElement('option');
        option.value = version.version;
        option.textContent = version.version;
        versionSelect.appendChild(option);
      });

      appRow.appendChild(versionSelect);

      appContainer.appendChild(appRow);
    });

    runCommands = data.reduce(function (acc, application) {
      application.versions.forEach(function (version) {
        acc[version.version] = version.run;
      });
      return acc;
    }, {});

    var generateButton = document.createElement('button');
    generateButton.textContent = 'Generate Config';
    generateButton.addEventListener('click', function () {
      generateConfig();
    });

    appContainer.appendChild(generateButton);
  })
  .catch(function (error) {
    console.log('Error fetching application data:', error);
  });


var data;
var runCommands;
var baseImages = [
  'ubuntu22.4:latest',
  'debian11:latest',
  'centos8:latest',
];
var appContainer = document.getElementById('app-container'); // Declare appContainer outside of the fetch block

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
      var appBox = document.createElement('div');
      appBox.classList.add('app-box');

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'checkbox-' + index;
      appBox.appendChild(checkbox);

      var heading = document.createElement('h3');
      heading.textContent = application.application;
      appBox.appendChild(heading);

      var versionSelect = document.createElement('select');
      versionSelect.id = 'version-select-' + index;
      versionSelect.addEventListener('change', function () {
        showRunCommand(this);
      });

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

      appBox.appendChild(versionSelect);

      var runCommandElement = document.createElement('p');
      runCommandElement.id = 'run-command-' + index;
      appBox.appendChild(runCommandElement);

      appContainer.appendChild(appBox);
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

function showRunCommand(selectElement) {
  var selectedVersion = selectElement.value;
  var runCommandElement = selectElement.nextElementSibling;
  var runCommand = runCommands[selectedVersion];
  runCommandElement.textContent = runCommand;
}

var dockerfileContent = '';

function generateConfig() {
  var selectedApps = [];

  data.forEach(function (application, index) {
    var checkbox = document.getElementById('checkbox-' + index);
    if (checkbox.checked) {
      var selectedApp = {
        application: application.application,
        version: document.getElementById('version-select-' + index).value,
        run: runCommands[document.getElementById('version-select-' + index).value],
        baseImage: document.getElementById('base-image-select').value,
      };
      selectedApps.push(selectedApp);
    }
  });

  var config = {
    selectedApplications: selectedApps,
  };

  var outputElement = document.getElementById('config-output');


  dockerfileContent = generateDockerfile(config); // Store the Dockerfile content

  var dockerfileTextarea = document.createElement('textarea');
  dockerfileTextarea.textContent = dockerfileContent;
  dockerfileTextarea.rows = 10;
  dockerfileTextarea.cols = 80;
  dockerfileTextarea.style.resize = 'none';
  appContainer.appendChild(dockerfileTextarea);

  var saveButton = document.createElement('button');
  saveButton.textContent = 'Save Dockerfile';
  saveButton.addEventListener('click', function () {
    saveDockerfile();
  });

  appContainer.appendChild(saveButton);
}

function generateDockerfile(config) {
  var dockerfileContent = '';

  dockerfileContent += `FROM ${config.selectedApplications[0].baseImage}\n\n`;

  config.selectedApplications.forEach(function (app) {
    dockerfileContent += `# Base image for ${app.application} ${app.version}\n`;
    dockerfileContent += `#${app.application}:${app.version}\n\n`;

    dockerfileContent += `# Run command\n`;
    dockerfileContent += `RUN ${app.run}\n\n`;
  });

  return dockerfileContent;
}

function saveDockerfile() {
  var blob = new Blob([dockerfileContent], { type: 'text/plain' });
  var anchor = document.createElement('a');
  anchor.download = 'Dockerfile';
  anchor.href= window.URL.createObjectURL(blob);
  anchor.click();
}
// Fetch the data from the server and populate the table
fetch('get_data.php')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#data-table tbody');

    data.forEach((row, index) => {
      const newRow = document.createElement('tr');
      newRow.setAttribute('data-id', index + 1); // Add the data-id attribute
      newRow.innerHTML = `
        <td>${row.application}</td>
        <td>${row.version}</td>
        <td>${row.run}</td>
        <td>
          <button class="edit-button" data-id="${index + 1}">Edit</button>
        </td>
        <td> <!-- Add the delete button column -->
          <button class="delete-button" data-id="${index + 1}">Delete</button>
        </td>
      `;
      tableBody.appendChild(newRow);
    });

    // Add event listeners to the edit buttons
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        const rowId = this.dataset.id;
        editRow(rowId);
      });
    });

    // Add event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const rowId = this.dataset.id;
        deleteRow(rowId);
      });
    });
  });

// Function to add a new row to the table
function addRow() {
  const applicationInput = document.querySelector('#application-input');
  const versionInput = document.querySelector('#version-input');
  const runInput = document.querySelector('#run-input');

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${applicationInput.value}</td>
    <td>${versionInput.value}</td>
    <td>${runInput.value}</td>
    <td>
      <button onclick="editRow(null)">Edit</button>
    </td>
  `;

  // Send the new data to the server for insertion
  fetch('add_data.php', {
    method: 'POST',
    body: JSON.stringify({
      application: applicationInput.value,
      version: versionInput.value,
      run: runInput.value
    })
  })
    .then(response => response.json())
    .then(data => {
      newRow.querySelector('button').setAttribute('onclick', `editRow(${data.id})`);
    });

  // Clear the input fields
  applicationInput.value = '';
  versionInput.value = '';
  runInput.value = '';

  // Add the new row to the table
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.appendChild(newRow);
}

// Function to edit a row
function editRow(rowId) {
    console.log('Row ID:', rowId);
    // Get the row element to be edited
    const row = document.querySelector(`#data-table tbody tr[data-id="${rowId}"]`);
  
    // Check if the row exists
    if (row) {
      // Get the cells within the row
      const applicationCell = row.querySelector('td:nth-child(1)');
      const versionCell = row.querySelector('td:nth-child(2)');
      const runCell = row.querySelector('td:nth-child(3)');
  
      // Get the current values in the cells
      const currentApplication = applicationCell.textContent;
      const currentVersion = versionCell.textContent;
      const currentRun = runCell.textContent;
  
      // Prompt the user to enter the updated values
      const updatedApplication = prompt('Enter updated application:', currentApplication);
      const updatedVersion = prompt('Enter updated version:', currentVersion);
      const updatedRun = prompt('Enter updated run:', currentRun);
  
      // Update the cell values with the updated values
      applicationCell.textContent = updatedApplication;
      versionCell.textContent = updatedVersion;
      runCell.textContent = updatedRun;
  
      // Send the updated data to the server for saving
      fetch('update_data.php', {
        method: 'POST',
        body: JSON.stringify({
          id: rowId,
          application: updatedApplication,
          version: updatedVersion,
          run: updatedRun
        })
      })
        .then(response => response.json())
        .then(data => {
          // You can perform any additional actions after the data is updated
          console.log('Row updated successfully:', data);
        });
    } else {
      console.error('Row not found');
    }
  }

// Function to delete a row
function deleteRow(rowId) {
    const requestPayload = { id: rowId };
  
    fetch('delete_row.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error deleting row: ' + response.statusText);
      })
      .then(data => {
        if (data.success) {
          // Row was deleted successfully
          const row = document.querySelector(`tr[data-id="${rowId}"]`);
          row.remove();
        } else {
          // Row was not found or there was an error
          console.error('Error deleting row:', data.error);
        }
      })
      .catch(error => {
        console.error('Error deleting row:', error);
      });
  }
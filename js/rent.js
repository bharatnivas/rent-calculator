  document.getElementById('rentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the values from the form
    const rentAmount = parseFloat(document.getElementById('rentAmount').value);
    const numberOfPersons = parseInt(document.getElementById('numberOfPersons').value);

    // Calculate the rent per person
    let rentPerPerson = rentAmount / numberOfPersons;

    // Display the results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h2>Rent Per Person:</h2>`;
    for (let i = 1; i <= numberOfPersons; i++) {
      resultsDiv.innerHTML += `
        <p>
          Person ${("0" + i).slice(-2)}: <span id="rentDisplay_${i}">${rentPerPerson.toFixed(2)}</span> INR
          <button class="personBtn" data-person="${i}">Extra Spend</button>
        </p>`;
    }

    // Add event listener to each "Extra Spend" button
    document.querySelectorAll('.personBtn').forEach(btn => {
      btn.addEventListener('click', function() {
        const personNumber = this.getAttribute('data-person');
        const personRent = parseFloat(document.getElementById(`rentDisplay_${personNumber}`).textContent);

        // Display the popup with information for the selected person
        const popupContent = document.getElementById('popupContent');
        popupContent.innerHTML = `
          <h2>Person ${("0" + personNumber).slice(-2)}</h2>
          <p>Rent: ${personRent.toFixed(2)} INR</p>
          <!-- Text field for extra spend amount -->
          <label for="extraSpend">Extra Spend Amount (INR):</label>
          <input type="number" id="extraSpend_${personNumber}" min="0">
          <button class="confirmExtraSpend" data-person="${personNumber}">Confirm</button>
          <button class="saveExtraSpend" data-person="${personNumber}">Save</button>
          <p id="extraSpendDisplay_${personNumber}"></p>
        `;
        document.getElementById('popup').style.display = 'block';

        // Handle confirm button click
        document.querySelectorAll('.confirmExtraSpend').forEach(confirmBtn => {
          confirmBtn.addEventListener('click', function() {
            const personNumber = this.getAttribute('data-person');
            const extraSpendAmount = parseFloat(document.getElementById(`extraSpend_${personNumber}`).value);
            // Display the extra spend amount inside the popup
            const extraSpendDisplay = document.getElementById(`extraSpendDisplay_${personNumber}`);
            extraSpendDisplay.innerHTML = `Extra Spend: ${extraSpendAmount.toFixed(2)} INR`;
          });
        });

    // Handle save button click
document.querySelectorAll('.saveExtraSpend').forEach(saveBtn => {
  saveBtn.addEventListener('click', function() {
    const personNumber = this.getAttribute('data-person');
    let extraSpendAmount = parseFloat(document.getElementById(`extraSpend_${personNumber}`).value);
    const rentDisplay = document.getElementById(`rentDisplay_${personNumber}`);

    // Subtract extra spend amount from the person's rent
    rentPerPerson -= extraSpendAmount;
    rentDisplay.textContent = rentPerPerson.toFixed(2);

    // Distribute the remaining extra spend amount evenly among other persons
    const remainingPersons = numberOfPersons - 1;
    if (remainingPersons > 0) {
      const distributedAmount = extraSpendAmount / remainingPersons;
      for (let i = 1; i <= numberOfPersons; i++) {
        if (i != personNumber) {
          const otherRentDisplay = document.getElementById(`rentDisplay_${i}`);
          let otherRent = parseFloat(otherRentDisplay.textContent);
          otherRent += distributedAmount;
          otherRentDisplay.textContent = otherRent.toFixed(2);
        }
      }
    }

    // Close the popup
    document.getElementById('popup').style.display = 'none';
  });
});

      });
    });

    // Close the popup when the close button or outside the popup is clicked
    document.querySelector('.close').addEventListener('click', function() {
      document.getElementById('popup').style.display = 'none';
    });
    window.onclick = function(event) {
      if (event.target == document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
      }
    };
  });
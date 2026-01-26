// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form and result display elements
    const form = document.getElementById('numberForm');
    const resultDiv = document.getElementById('result');
    
    // Add event listener for form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Add event listeners for input validation
    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', clearPreviousResult);
    });
});

/**
 * Handles the form submission event
 * Prevents default form behavior and processes the number comparison
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get the input values from the form
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const num3Input = document.getElementById('num3');
    
    // Parse the input values as integers
    const num1 = parseInt(num1Input.value);
    const num2 = parseInt(num2Input.value);
    const num3 = parseInt(num3Input.value);
    
    // Validate that all fields have been filled
    if (!validateInputs(num1Input.value, num2Input.value, num3Input.value)) {
        displayResult('error', 'Please enter valid numbers in all three fields', '⚠️');
        return;
    }
    
    // Check if any of the parsed values is NaN
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        displayResult('error', 'Please enter valid integer values', '⚠️');
        return;
    }
    
    // Find the largest number among the three inputs
    const largestNumber = findLargestNumber(num1, num2, num3);
    
    // Display the result to the user
    displayResult('success', `The largest number is:`, '🎯', largestNumber);
}

/**
 * Validates that all input fields contain values
 * @param {string} val1 - First input value
 * @param {string} val2 - Second input value
 * @param {string} val3 - Third input value
 * @returns {boolean} - True if all fields are filled, false otherwise
 */
function validateInputs(val1, val2, val3) {
    return val1.trim() !== '' && val2.trim() !== '' && val3.trim() !== '';
}

/**
 * Determines the largest number among three given numbers
 * @param {number} num1 - First number to compare
 * @param {number} num2 - Second number to compare
 * @param {number} num3 - Third number to compare
 * @returns {number} - The largest of the three numbers
 */
function findLargestNumber(num1, num2, num3) {
    // Use Math.max to find the largest number
    // This is more concise than the original if-else chain
    // and handles all cases including equal numbers
    return Math.max(num1, num2, num3);
}

/**
 * Displays the result message to the user with animation
 * @param {string} type - Type of result ('success' or 'error')
 * @param {string} message - Message to display
 * @param {string} icon - Icon to show with the result
 * @param {number} [number] - The largest number (optional, for success case)
 */
function displayResult(type, message, icon, number = null) {
    const resultDiv = document.getElementById('result');
    
    // Build the HTML content for the result display
    let content = `
        <div class="result-icon">${icon}</div>
        <h2>${message}</h2>
    `;
    
    // If a number is provided, display it with special formatting
    if (number !== null) {
        content += `<div class="number">${number}</div>`;
    }
    
    // Set the CSS class based on result type
    resultDiv.className = `result ${type}`;
    resultDiv.innerHTML = content;
    
    // Trigger the animation by adding the 'show' class
    // Use setTimeout to ensure the browser processes the class change
    setTimeout(() => {
        resultDiv.classList.add('show');
    }, 10);
}

/**
 * Clears the previous result when user starts typing
 * This provides better user experience by removing old results
 */
function clearPreviousResult() {
    const resultDiv = document.getElementById('result');
    if (resultDiv.classList.contains('show')) {
        resultDiv.classList.remove('show');
    }
}

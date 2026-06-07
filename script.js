document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('numberForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', handleFormSubmit);

    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', clearPreviousResult);
    });

    document.getElementById('resetBtn').addEventListener('click', resetForm);
});

/**
 * Prevents the default form POST and delegates to the comparison logic.
 * @param {Event} event
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const num3Input = document.getElementById('num3');

    const num1 = parseInt(num1Input.value);
    const num2 = parseInt(num2Input.value);
    const num3 = parseInt(num3Input.value);

    if (!validateInputs(num1Input.value, num2Input.value, num3Input.value)) {
        displayResult('error', 'Please enter valid numbers in all three fields', '⚠️');
        return;
    }

    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        displayResult('error', 'Please enter valid integer values', '⚠️');
        return;
    }

    const largestNumber = findLargestNumber(num1, num2, num3);
    displayResult('success', `The largest number is:`, '🎯', largestNumber);
}

/**
 * Returns true only when all three raw input strings are non-empty.
 * @param {string} val1
 * @param {string} val2
 * @param {string} val3
 * @returns {boolean}
 */
function validateInputs(val1, val2, val3) {
    return val1.trim() !== '' && val2.trim() !== '' && val3.trim() !== '';
}

/**
 * Returns the largest of three numbers, including the equal-value case.
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @returns {number}
 */
function findLargestNumber(num1, num2, num3) {
    return Math.max(num1, num2, num3);
}

/**
 * Renders a result card with an icon and optional number display.
 * @param {string} type - 'success' or 'error'
 * @param {string} message
 * @param {string} icon
 * @param {number|null} [number]
 */
function displayResult(type, message, icon, number = null) {
    const resultDiv = document.getElementById('result');

    let content = `
        <div class="result-icon">${icon}</div>
        <h2>${message}</h2>
    `;

    if (number !== null) {
        content += `<div class="number">${number}</div>`;
    }

    resultDiv.className = `result ${type}`;
    resultDiv.innerHTML = content;

    // setTimeout ensures the browser has processed the class reset before
    // adding 'show', so the CSS transition fires correctly.
    setTimeout(() => {
        resultDiv.classList.add('show');
    }, 10);
}

/**
 * Hides the result card when the user edits any input field.
 */
function clearPreviousResult() {
    const resultDiv = document.getElementById('result');
    if (resultDiv.classList.contains('show')) {
        resultDiv.classList.remove('show');
    }
}

/**
 * Clears all inputs, hides the result, and returns focus to the first field.
 */
function resetForm() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('num3').value = '';
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('show');
    document.getElementById('num1').focus();
}

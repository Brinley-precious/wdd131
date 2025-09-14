// Get references to DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Add click event listener to the Add Chapter button
button.addEventListener('click', function () {
    // Make sure the input is not empty (trim removes spaces)
    if (input.value.trim() !== '') {
        // Create list item and delete button
        const li = document.createElement('li');
        li.textContent = input.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

        // Add delete functionality
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        // Append delete button to list item, and list item to the list
        li.append(deleteButton);
        list.append(li);

        // Clear input field
        input.value = '';
    }

    // Always return focus to input field
    input.focus();
});

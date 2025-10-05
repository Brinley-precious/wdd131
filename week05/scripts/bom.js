// Get references to DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Load existing chapters from localStorage, or start with an empty array
let chaptersArray = getChapterList() || [];

// Display all stored chapters when the page loads
chaptersArray.forEach(chapter => displayList(chapter));

// Add a new chapter when the button is clicked
button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList(); // update localStorage
        input.value = '';
        input.focus();
    }
});

// Display list item with delete button
function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');
    li.append(deleteButton);
    list.append(li);

    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}

// Save list to localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Retrieve list from localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Delete chapter from list and update localStorage
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1); // remove ❌ symbol
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}

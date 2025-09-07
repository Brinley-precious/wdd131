// Display current year in footer
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Insert last modified date
document.getElementById("lastModified").textContent =
    "Last Modification: " + document.lastModified;

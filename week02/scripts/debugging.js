// Select DOM elements correctly
const radiusOutput = document.getElementById('radius');
const areaOutput = document.getElementById('area');

// variables
let area = 0;
const PI = 3.14159;

// first calculation
let radius = 10;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area.toFixed(2); // formatted for readability

// second calculation (reassign radius)
radius = 20;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area.toFixed(2);

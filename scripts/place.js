// Function to format the date string to match the sample: MM/DD/YYYY HH:MM:SS
function formatLastModifiedDate(date) {
    // Get components of the Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Combine into the required format
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
}

// ----------------------------------------------------------------------
// FOOTER REQUIREMENTS
// ----------------------------------------------------------------------

// Get the current year and display it in the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the last modified date object
const lastModifiedDate = new Date(document.lastModified);

// Format and display the last modified date and time
document.getElementById('lastModified').textContent = formatLastModifiedDate(lastModifiedDate);


// ----------------------------------------------------------------------
// WIND CHILL REQUIREMENTS
// ----------------------------------------------------------------------

// Define static variables for temperature and wind speed
const temp = 5; // Celsius
const windSpeed = 3; // km/h

/**
 * Calculates the wind chill factor in Celsius.
 * @param {number} temperature The current temperature in Celsius.
 * @param {number} windSpeed The current wind speed in km/h.
 * @returns {number|string} The calculated wind chill or "N/A" if conditions are not met.
 */
function calculateWindChill(temperature, windSpeed) {
    // Condition check: Temperature <= 10°C AND Wind speed > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        // Wind Chill Formula (Metric)
        return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1);
    } else {
        return "N/A";
    }
}

// Display the wind chill factor on the page
document.getElementById('wind-chill').textContent = calculateWindChill(temp, windSpeed);
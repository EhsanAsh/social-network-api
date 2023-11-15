// Desc: This file contains the function to format the date
// Date: 13/11/2023
// Used (https://www.w3schools.com/js/js_dates.asp) as a reference
// ==============================================================

// Function to format the date
// ==============================================================
const dateFormat = (date) => {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1; // added 1 because January is 0
    let year = d.getFullYear();
    return `${day}/${month}/${year}`;
};
// ==============================================================

// Export the function
// ==============================================================
module.exports = dateFormat;
// ==============================================================

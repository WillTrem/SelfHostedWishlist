console.log('Content script');

// Use a property on the window object to store the current element
window.currentElement = window.currentElement || null;

// Function to add a border to the hovered element
function addBorder(event) {
  if (window.currentElement) {
    window.currentElement.style.outline = ''; // Remove the border from the previous element
  }

  // Check if the element is a text tag and contains a potential price
  const textTags = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  const textContent = event.target.textContent.trim();
  const pricePattern = /^(\$|€|£|¥|₹|[A-Z]{3})?\s?\d+([.,]\d{2})?\s?(\$|€|£|¥|₹|[A-Z]{3})?$/i; // Regular expression to check for prices

  if (textTags.includes(event.target.tagName) && pricePattern.test(textContent)) {
    window.currentElement = event.target;
    window.currentElement.style.outline = '2px solid red'; // Add a border to the new element
  } else {
    window.currentElement = null;
  }
}

// Function to remove the border when the mouse leaves the element
function removeBorder(event) {
  if (window.currentElement) {
    window.currentElement.style.outline = ''; // Remove the border
    window.currentElement = null;
  }
}

// Add event listeners to the document
document.addEventListener('mouseover', addBorder);
document.addEventListener('mouseout', removeBorder);

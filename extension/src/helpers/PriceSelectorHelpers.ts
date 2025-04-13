export function injectPriceSelector() {
  // Create and inject script with the content functionality
  const script = document.createElement('script');
  script.id = 'wishlist-content-script';
  script.textContent = `
    console.log('Content script applied');
    
    // Use a property on the window object to store the current element
    window.currentElement = window.currentElement || null;
    
    // Function to add a border to the hovered element
    window.addBorder = function(event) {
      if (window.currentElement) {
        window.currentElement.style.outline = ''; // Remove the border from the previous element
      }
    
      // Check if the element is a text tag and contains a potential price
      const textTags = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
      const textContent = event.target.textContent.trim();
      const pricePattern = /^(\\$|€|£|¥|₹|[A-Z]{3})?\\s?\\d+([.,]\\d{2})?\\s?(\\$|€|£|¥|₹|[A-Z]{3})?$/i;
    
      if (textTags.includes(event.target.tagName) && pricePattern.test(textContent)) {
        window.currentElement = event.target;
        window.currentElement.style.outline = '2px solid red'; // Add a border to the new element
      } else {
        window.currentElement = null;
      }
    }
    
    // Function to remove the border when the mouse leaves the element
    window.removeBorder = function(event) {
      if (window.currentElement) {
        window.currentElement.style.outline = ''; // Remove the border
        window.currentElement = null;
      }
    }
    
    // Add event listeners to the document
    document.addEventListener('mouseover', window.addBorder);
    document.addEventListener('mouseout', window.removeBorder);
  `;

  document.head.appendChild(script);
}

export function removePriceSelector() {
  const script = document.createElement('script');
  script.textContent = `
    console.log('Cleanup script applied');
    
    // Cleanup script to remove event listeners and reset the outline
    document.removeEventListener('mouseover', window.addBorder);
    document.removeEventListener('mouseout', window.removeBorder);
    if (window.currentElement) {
      window.currentElement.style.outline = '';
    }
  `;

  document.head.appendChild(script);

  // Remove the injected script element
  const contentScript = document.getElementById('wishlist-content-script');
  if (contentScript) {
    contentScript.remove();
  }
}

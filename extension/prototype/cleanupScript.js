console.log('Cleanup script');

// Cleanup script to remove event listeners and reset the outline
document.removeEventListener('mouseover', addBorder);
document.removeEventListener('mouseout', removeBorder);
if (window.currentElement) {
  window.currentElement.style.outline = '';
}

let currentElement: HTMLElement | null = null;

function isPotentialPriceElement(e: HTMLElement): boolean {
  // console.log('isPotentialPriceElement');
  const textTags = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  const textContent = e.textContent?.trim() ?? '';
  const pricePattern = /^(\$|€|£|¥|₹|[A-Z]{3})?\s?\d+([.,]\d{2})?\s?(\$|€|£|¥|₹|[A-Z]{3})?$/i;

  // console.log(textContent);
  // console.log('tags', textTags.includes(e.tagName));
  // console.log('pattern', pricePattern.test(textContent));
  if (textTags.includes(e.tagName) && pricePattern.test(textContent)) {
    // console.log(true);
    return true;
  } else {
    // console.log(false);
    return false;
  }
}

function addPriceBorder(event: MouseEvent) {
  // Function to add a border to the hovered element
  // console.log('addPriceBorder');
  if (currentElement) {
    currentElement.style.outline = ''; // Remove the border from the previous element
  }
  const target = event.target as HTMLElement;
  if (target) {
    // Check if the element is a text tag and contains a potential price

    if (isPotentialPriceElement(target)) {
      currentElement = target;
      currentElement.style.outline = '2px solid red'; // Add a border to the new element
    } else {
      currentElement = null;
    }
  }
}

function removePriceBorder() {
  if (currentElement) {
    currentElement.style.outline = ''; // Remove the border
    currentElement = null;
  }
}

export function injectPriceSelector() {
  // console.log('injectPriceSelector');
  // Add event listeners to the document
  document.addEventListener('mouseover', addPriceBorder);
  document.addEventListener('mouseout', removePriceBorder);
}

export function removePriceSelector() {
  document.removeEventListener('mouseover', addPriceBorder);
  document.removeEventListener('mouseout', removePriceBorder);
  if (currentElement) {
    currentElement.style.outline = '';
  }
}

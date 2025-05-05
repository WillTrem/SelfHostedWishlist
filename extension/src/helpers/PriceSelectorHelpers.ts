let currentElement: HTMLElement | null = null;
const PRICE_OUTLINE: string = '2px solid red';
let priceClickHandler: ((event: MouseEvent) => void) | null = null;

function isPotentialPriceElement(el: HTMLElement): boolean {
  const textContent = el.textContent?.trim() ?? '';
  const pricePattern = /^(\$|€|£|¥|₹|[A-Z]{3})?\s?\d+([.,]\d{2})?\s?(\$|€|£|¥|₹|[A-Z]{3})?$/i;

  // Check if element contains a price-like pattern
  if (!pricePattern.test(textContent)) return false;

  // Make sure it's the innermost element with this exact price text
  const hasTextNodeWithExactPrice = Array.from(el.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .some((node) => pricePattern.test(node.textContent?.trim() ?? ''));

  // Either it has a direct text node with the price, or no children at all
  return hasTextNodeWithExactPrice || el.children.length === 0;
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
      currentElement.style.outline = PRICE_OUTLINE; // Add a border to the new element
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

export function injectPriceSelector(onClickCallback?: (priceStr: string) => void) {
  // Create a reusable handler that we can reference for both adding and removing
  priceClickHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target && isPotentialPriceElement(target)) {
      document.removeEventListener('mouseover', addPriceBorder);
      document.removeEventListener('mouseout', removePriceBorder);
      document.removeEventListener('click', priceClickHandler!);
      onClickCallback?.(target.textContent?.trim() ?? '');
    }
  };

  document.addEventListener('mouseover', addPriceBorder);
  document.addEventListener('mouseout', removePriceBorder);
  document.addEventListener('click', priceClickHandler); // Changed from mousedown to click
}

export function removePriceSelector() {
  document.removeEventListener('mouseover', addPriceBorder);
  document.removeEventListener('mouseout', removePriceBorder);
  if (priceClickHandler) {
    document.removeEventListener('click', priceClickHandler);
  }
  if (currentElement) {
    currentElement.style.outline = '';
  }
}

// TO RUN IN THE BROWSER CONSOLE OF THE ITEM PAGE
// MAGIC
let theCurrentProduct = {};
// 1) Identify the image tags in the HTML
const imageTags = document.querySelectorAll("img");
// console.log(imageTags);

// 2) Obtain the image tag with the highest size (IN PROGRESS)
let largest = null;
let largestArea = null;
imageTags.forEach((tag) => {
  const currentStyle = window.getComputedStyle(tag);

  const currentArea =
    parseFloat(currentStyle.width) * parseFloat(currentStyle.height);

  if (largest === null || currentArea > largestArea) {
    const largestStyle = window.getComputedStyle(tag);
    largestArea =
      parseFloat(largestStyle.width) * parseFloat(largestStyle.height);
    largest = tag;
  }
});
theCurrentProduct.image = largest.src;

// 3) Match the text that resembles closest to the tab's title (WORKS)
const titleText = document.querySelector("title").textContent;
const textTags = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p")];
// console.log(textTags);
// console.log(titleText);

theCurrentProduct.title = "";

for (let i = 0; i < textTags.length; i++) {
  const tag = textTags[i];

  if (tag.textContent) {
    const currentTextContent = tag.textContent.trim();
    if (
      currentTextContent &&
      titleText.includes(currentTextContent) &&
      currentTextContent.length > theCurrentProduct.title.length
    ) {
      theCurrentProduct.title = currentTextContent;
    }
  }
}

console.log("Product: ", theCurrentProduct);

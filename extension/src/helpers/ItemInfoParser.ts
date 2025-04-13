import Item from '@/interfaces/Item';

export function parseCurrentItem() {
  let currentItem: Partial<Item> = {};
  // 1) Identify the image tags in the HTML
  const imageTags = document.querySelectorAll('img');
  // console.log(imageTags);

  // Attempt to obtain the image using the open graph meta tag og:image (Not always accurate)
  const ogImageMetaTag = document.querySelector('meta[property="og:image"]');
  const tagContent = ogImageMetaTag?.getAttribute('content');
  if (tagContent) {
    currentItem.image_url = tagContent;
  } else {
    // Obtain the image tag with the highest size (IN PROGRESS)
    let largest: HTMLImageElement | undefined;
    let largestArea: number | undefined;
    imageTags.forEach((tag) => {
      const currentStyle = window.getComputedStyle(tag);

      const currentArea = parseFloat(currentStyle.width) * parseFloat(currentStyle.height);

      if ((largest === null && largestArea === null) || currentArea > largestArea!) {
        const largestStyle = window.getComputedStyle(tag);
        largestArea = parseFloat(largestStyle.width) * parseFloat(largestStyle.height);
        largest = tag;
      }
    });
    currentItem.image_url = largest?.src;
  }

  // 3) Match the text that resembles closest to the tab's title
  const titleText = document.querySelector('title')?.textContent;
  if (titleText) {
    const textTags = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,span,p')];
    // console.log(textTags);
    // console.log(titleText);

    // TODO: Take the longest one that matches from the beginning of the string
    // currentItem.title = '';

    for (let i = 0; i < textTags.length; i++) {
      const tag = textTags[i];

      if (tag.textContent) {
        const currentTextContent = tag.textContent.trim();
        if (
          currentTextContent &&
          titleText.includes(currentTextContent) &&
          currentTextContent.length > (currentItem.name?.length ?? 0)
        ) {
          currentItem.name = currentTextContent;
        }
      }
    }
  }

  // 4) URL & Website name
  const { href, origin } = window.location;

  currentItem.website = origin;
  currentItem.url = href;

  console.log('Product: ', currentItem);

  // TODO:
  // Handle amazon separately
  return currentItem;
}

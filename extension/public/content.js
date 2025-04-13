let container = null;

function createContainer() {
  // Only create if it doesn't exist yet
  if (document.getElementById('wishlist-extension-root')) {
    return;
  }

  container = document.createElement('div');
  container.id = 'wishlist-extension-root';
  // container.style.cssText = `
  //   position: fixed;
  //   top: 10px;
  //   right: 10px;
  //   z-index: 10000;
  //   max-width: 360px;
  //   max-height: 600px;
  //   box-shadow: 0 0 10px rgba(0,0,0,0.2);
  //   border-radius: 8px;
  //   overflow: hidden;
  //   background-color: white;
  // `;
  container.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10000;
  `;
  document.body.appendChild(container);

  // // Include the assets without hardcoding the hash
  const script = document.createElement('script');
  script.type = 'module';
  script.src = chrome.runtime.getURL('assets/index.js'); // Chrome will resolve to the actual hashed file
  container.appendChild(script);

  // Use iframe to load the extension page which has all the correct references
  // const iframe = document.createElement('iframe');
  // iframe.src = chrome.runtime.getURL('index.html');
  // iframe.style.cssText = `
  //   width: 100%;
  //   height: 100%;
  //   border: none;
  // `;
  // container.appendChild(iframe);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggle') {
    if (!document.getElementById('wishlist-extension-root')) {
      createContainer();
    } else {
      const root = document.getElementById('wishlist-extension-root');
      if (root.style.display === 'none') {
        root.style.display = 'block';
      } else {
        root.style.display = 'none';
      }
    }
  }
});

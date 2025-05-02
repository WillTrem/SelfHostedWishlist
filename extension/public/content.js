let container = null;

function createContainer() {
  // Only create if it doesn't exist yet
  if (document.getElementById('wishlist-extension-root')) {
    return;
  }

  container = document.createElement('div');
  container.id = 'wishlist-extension-root';
  container.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10000;
  `;
  document.body.appendChild(container);

  // Main script for the actual extension functionality
  const script = document.createElement('script');
  script.type = 'module';
  script.src = chrome.runtime.getURL('assets/index.js');
  container.appendChild(script);
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

// Add listener for storage requests
window.addEventListener('message', (event) => {
  if (event.source !== window || !event.data.storageAction) return;

  const { storageAction, key, value, requestId } = event.data;

  if (storageAction === 'get') {
    chrome.storage.local.get([key], (result) => {
      window.postMessage(
        {
          storageResponse: true,
          requestId,
          value: result[key],
        },
        '*',
      );
    });
  } else if (storageAction === 'set') {
    const data = {};
    data[key] = value;
    chrome.storage.local.set(data, () => {
      window.postMessage(
        {
          storageResponse: true,
          requestId,
        },
        '*',
      );
    });
  }
});

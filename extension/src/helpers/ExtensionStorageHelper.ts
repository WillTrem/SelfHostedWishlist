import { LOCALSTORAGE_BASE_URL_KEY } from '@/constants';

export async function getApiUrl(): Promise<string | null> {
  return getExtensionStorageItem<string>(LOCALSTORAGE_BASE_URL_KEY);
}

export async function setApiUrl(url: string): Promise<void> {
  return setExtensionStorageItem<string>(LOCALSTORAGE_BASE_URL_KEY, url);
}

// Generic storage access functions
export async function getExtensionStorageItem<T>(key: string): Promise<T | null> {
  try {
    const requestId = Date.now().toString(36) + Math.random().toString(36).substring(2);

    return new Promise((resolve) => {
      const handleResponse = (event: MessageEvent) => {
        if (event.data.storageResponse && event.data.requestId === requestId) {
          window.removeEventListener('message', handleResponse);
          resolve(event.data.value);
        }
      };

      window.addEventListener('message', handleResponse);
      window.postMessage({ storageAction: 'get', key, requestId }, '*');

      // Fallback after timeout
      setTimeout(() => {
        window.removeEventListener('message', handleResponse);
        const item = localStorage.getItem(key);
        resolve(item ? JSON.parse(item) : null);
      }, 300);
    });
  } catch (error) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
}

export async function setExtensionStorageItem<T>(key: string, value: T): Promise<void> {
  try {
    const requestId = Date.now().toString(36) + Math.random().toString(36).substring(2);

    return new Promise((resolve) => {
      const handleResponse = (event: MessageEvent) => {
        if (event.data.storageResponse && event.data.requestId === requestId) {
          window.removeEventListener('message', handleResponse);
          resolve();
        }
      };

      window.addEventListener('message', handleResponse);
      window.postMessage({ storageAction: 'set', key, value, requestId }, '*');

      // Fallback after timeout
      setTimeout(() => {
        window.removeEventListener('message', handleResponse);
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      }, 300);
    });
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

import { Provider } from '@/components/ui/provider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Use the container injected by content.js
const rootElement = document.getElementById('wishlist-extension-root');
const app = (
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
if (rootElement) {
  createRoot(rootElement).render(app);
} else {
  createRoot(document.getElementById('root')!).render(app);
}

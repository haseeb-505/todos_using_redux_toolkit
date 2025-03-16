import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Add this
import './index.css';
import App from './App.jsx';
import { store } from './app/store.js';
import { Provider } from 'react-redux';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root
const root = createRoot(rootElement);

// Render the app
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
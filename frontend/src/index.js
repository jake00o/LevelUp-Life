// Entry point of the React app
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Custom CSS styles

// Mount the root React component to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

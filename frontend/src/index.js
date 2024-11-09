// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use client from react-dom
import App from './App';
import './assets/styles/global.css'; // If you have global styles

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

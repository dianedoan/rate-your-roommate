// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use client from react-dom
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

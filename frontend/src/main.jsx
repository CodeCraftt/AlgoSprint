import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you import from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// Get the root element
const container = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(container);

// Render the App within the AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

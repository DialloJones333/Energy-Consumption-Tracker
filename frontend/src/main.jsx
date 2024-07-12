import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the application with React.StrictMode to catch any potential bugs
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

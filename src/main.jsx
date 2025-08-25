import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Support from './Support.jsx'

const path = window.location.pathname;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {path === '/support' ? <Support /> : <App />}
  </StrictMode>,
)

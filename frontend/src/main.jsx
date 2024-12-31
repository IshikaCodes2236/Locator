import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ModalProvider>
    <App />
    </ModalProvider>
  </BrowserRouter>,
)

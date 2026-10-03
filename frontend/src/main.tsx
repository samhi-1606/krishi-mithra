import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { LanguageProvider } from './hooks/useLanguage'
import { FarmerProvider } from './hooks/useFarmer'
import { AlertProvider } from './hooks/useAlerts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <FarmerProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </FarmerProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)

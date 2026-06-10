import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { restoreAllFromBackup } from './utils/storage'
import './styles/global.css'
import './styles/themes.css'

// Restore any localStorage data that iOS/WebKit evicted during a SW update.
// Awaited so React mounts with the correct data on the very first render.
restoreAllFromBackup().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
})

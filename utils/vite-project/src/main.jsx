import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FirebaseProvider } from './hooks/FirebaseProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
     <App />
    </FirebaseProvider>
  </React.StrictMode>
)

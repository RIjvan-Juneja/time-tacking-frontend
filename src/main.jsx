import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

// ============= for remove all console log in production level  ================= /
if (import.meta.env.VITE_APP_ENVIRONMENT === 'production') {
  console.log = () => { }
  console.error = () => { }
  console.debug = () => { }
}


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
  ,
)

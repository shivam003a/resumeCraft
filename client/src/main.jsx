import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
// Only for vercel analytics, remove if not required
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <HashRouter>
            <App />
            // Only for vercel analytics, remove if not required
            <SpeedInsights />
            <Analytics />
            <Toaster position="bottom-right" />
        </HashRouter>
    </Provider>,
)

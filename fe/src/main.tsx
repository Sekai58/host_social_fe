import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'
import ToastProvider from './components/ToastProvider/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ToastProvider>
  </React.StrictMode>,
)

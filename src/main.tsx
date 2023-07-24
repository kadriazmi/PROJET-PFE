import AuthProvider from './modules/auth/context/AuthProvider'
import { BrowserRouter } from 'react-router-dom'
import { store } from './modules/shared/store'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './app/App'
import React from 'react'
import './app/index.scss'
import './i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)

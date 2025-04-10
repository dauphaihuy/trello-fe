import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import theme from './theme.js'
import { ConfirmProvider } from 'material-ui-confirm'
import {
  ThemeProvider
} from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/' >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            confirmationButtonProps: { color: 'secondary', variant: 'outlined' }
          }}>
            <CssBaseline />
            <App />
            <ToastContainer />
          </ConfirmProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)

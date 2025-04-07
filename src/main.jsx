import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import theme from './theme.js'
import { ConfirmProvider } from "material-ui-confirm"
import {
  ThemeProvider
} from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        confirmationButtonProps: { color: 'secondary', variant: 'outlined' }
      }}>
        <CssBaseline />
        <App />
        <ToastContainer />
      </ConfirmProvider>
    </ThemeProvider>
  </Provider>
)

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
createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      confirmationButtonProps: { color: 'secondary', variant: 'outlined' }
    }}>
      <CssBaseline />
      <App />
      <ToastContainer />
    </ConfirmProvider>
  </ThemeProvider>
)

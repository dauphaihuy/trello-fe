import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline, GlobalStyles } from '@mui/material'
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
//cau hinh redux-persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)
//kỹ thuật injectstore
import { injectStore } from './utils/authorizeAxios.js'
injectStore(store)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename='/' >
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            confirmationButtonProps: { color: 'secondary', variant: 'outlined' }
          }}>
            <GlobalStyles styles={{
              a: { textDecoration: 'none' }
            }} />
            <CssBaseline />
            <App />
            <ToastContainer />
          </ConfirmProvider>
        </ThemeProvider>
      </PersistGate>
    </BrowserRouter >
  </Provider>

)

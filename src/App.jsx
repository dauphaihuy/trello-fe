import { Route, Routes } from 'react-router-dom'
import Board from './pages/Boards/Board'
import Auth from './pages/Auth/Auth'
import AccountVerifycation from './pages/Auth/AccountVerifycation'

function App() {
  return (
    <Routes>
      <Route path='/boards/:boardId' element={<Board />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verifycation' element={<AccountVerifycation />} />
      <Route path='*' element={<div>404</div>} />
    </Routes >
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import Board from './pages/Boards/Board'
import Auth from './pages/Auth/Auth'

function App() {
  return (
    <Routes>
      <Route path='/boards/:boardId' element={<Board />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='*' element={<div>404</div>} />
    </Routes >
  )
}

export default App

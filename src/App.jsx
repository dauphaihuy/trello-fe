import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Board from './pages/Boards/Board'
import Auth from './pages/Auth/Auth'
import AccountVerifycation from './pages/Auth/AccountVerifycation'
import { selectCurrentUser } from './redux/user/UserSlice'
import { useSelector } from 'react-redux'

/* Protected Routes (Hiểu đơn giản trong dự án của chúng ta là những route chỉ cho truy cập sau khi đã login) */
const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to={'/login'} replace={true} />
  }
  /* <Outlet> của react-router-dom sẽ chạy vào các child route trong này */
  return <Outlet />
}
function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to={'/boards/67ef3aa62ffd2d6cd9c6fca8'} replace={true} />
      } />
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path='/boards/:boardId' element={<Board />} />
      </Route>
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verifycation' element={<AccountVerifycation />} />
      <Route path='*' element={<div>404</div>} />
    </Routes >
  )
}

export default App

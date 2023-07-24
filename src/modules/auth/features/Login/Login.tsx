import { useAppDispatch } from '@src/modules/shared/store'
import { login } from '../../data/authThunk'

const Login = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    dispatch(login({ email: 'tarekgzgz@gmail.com', password: '12345678' }))
  }

  return (
    <>
      <p>Login</p>
      <button onClick={handleSubmit}>Click me</button>
    </>
  )
}

export default Login

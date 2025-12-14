import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'
import Context from '../contexts/Context'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = { email: 'docente@desafiolatam.com', password: '123456' }

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)
  const { setDeveloper } = useContext(Context)

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('Todos los campos son obligatorios.')
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!')
    }

    try {
      const { data: token } = await axios.post(ENDPOINT.login, user)
      // guardar token de sesión
      window.sessionStorage.setItem('token', token)
      // guardar info mínima; profile luego trae el resto
      setDeveloper({ email: user.email })
      navigate('/profile')
    } catch (error) {
      console.error(error)
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        'Error al iniciar sesión'
      window.alert(msg)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='formulario'>
      <h1>Iniciar Sesión</h1>
      <div className='my-3'>
        <label className='form-label'>Email</label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Email'
        />
      </div>
      <div className='my-3'>
        <label className='form-label'>Password</label>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
        />
      </div>
      <button type='submit' className='btn btn-light mt-3'>
        Iniciar Sesión
      </button>
    </form>
  )
}

export default Login

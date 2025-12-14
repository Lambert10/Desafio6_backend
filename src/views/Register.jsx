import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = {
  email: 'docente@desafiolatam.com',
  password: '123456',
  rol: 'Seleccione un rol',
  lenguage: 'Seleccione un Lenguage',
}

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !user.email.trim() ||
      !user.password.trim() ||
      user.rol === 'Seleccione un rol' ||
      user.lenguage === 'Seleccione un Lenguage'
    ) {
      return window.alert('Todos los campos son obligatorios.')
    }

    if (!emailRegex.test(user.email)) {
      return window.alert('El formato del email no es correcto!')
    }

    try {
      await axios.post(ENDPOINT.users, user)
      window.alert('Usuario registrado correctamente. Ahora inicia sesión.')
      setUser(initialForm)
      navigate('/login')
    } catch (error) {
      console.error(error)
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        'Error al registrar usuario'
      window.alert(msg)
    }
  }

  useEffect(() => {
    document.title = 'Soft Jobs - Registro'
  }, [])

  return (
    <form onSubmit={handleSubmit} className='formulario'>
      <h1>Registro</h1>
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
      <div className='my-3'>
        <label className='form-label'>Rol</label>
        <select
          value={user.rol}
          onChange={handleUser}
          name='rol'
          className='form-select'
        >
          <option disabled>Seleccione un rol</option>
          <option value='Frontend'>Frontend</option>
          <option value='Backend'>Backend</option>
          <option value='FullStack'>FullStack</option>
        </select>
      </div>
      <div className='my-3'>
        <label className='form-label'>Lenguaje de programación favorito</label>
        <select
          value={user.lenguage}
          onChange={handleUser}
          name='lenguage'
          className='form-select'
        >
          <option disabled>Seleccione un Lenguage</option>
          <option value='JavaScript'>JavaScript</option>
          <option value='Python'>Python</option>
          <option value='Ruby'>Ruby</option>
        </select>
      </div>
      <button type='submit' className='btn btn-light mt-3'>
        Registrarme
      </button>
    </form>
  )
}

export default Register

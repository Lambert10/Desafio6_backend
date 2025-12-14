import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')

    if (!token) {
      window.alert('Debes iniciar sesión.')
      navigate('/login')
      return
    }

    axios
      .get(ENDPOINT.users, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data: [user] }) => setDeveloper({ ...user }))
      .catch((error) => {
        const msg =
          error.response?.data?.message ||
          error.response?.data ||
          'Sesión inválida o expirada. Vuelve a iniciar sesión.'
        console.error(error)
        window.alert(msg)
        setDeveloper(null)
        window.sessionStorage.removeItem('token')
        navigate('/login')
      })
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  )
}

export default Profile

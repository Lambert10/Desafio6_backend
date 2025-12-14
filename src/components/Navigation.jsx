import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Context from '../contexts/Context'

const Navigation = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const logout = () => {
    setDeveloper(null)
    window.sessionStorage.removeItem('token')
    navigate('/')
  }

  const isLogin = () => {
    if (!getDeveloper) {
      return (
        <>
          <span className='me-3'>
            <Link to='/login'>
              Iniciar sesión <i className='fa-solid fa-right-to-bracket ms-2' />
            </Link>
          </span>
          <span>
            <Link to='/register'>
              Regístrate <i className='fa-solid fa-user-plus ms-2' />
            </Link>
          </span>
        </>
      )
    }

    return (
      <>
        <span className='me-3'>
          <Link to='/profile'>
            Perfil <i className='fa-solid fa-user ms-2' />
          </Link>
        </span>
        <span role='button' onClick={logout}>
          Cerrar sesión <i className='fa-solid fa-right-from-bracket ms-2' />
        </span>
      </>
    )
  }

  return (
    <nav className='navbar'>
      <span className='logo'>SJ</span>
      <div className='opciones'>
        <span className='me-3'>
          <Link to='/'>
            Inicio <i className='fa-solid fa-house ms-2' />
          </Link>
        </span>
        {isLogin()}
      </div>
    </nav>
  )
}

export default Navigation

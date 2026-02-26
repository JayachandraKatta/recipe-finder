import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import './index.css'

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [invalidUser, setInvalidUser] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (token) {
      navigate('/', {replace: true})
    }
  }, [navigate])

  const validate = () => {
    const newErrors = {}

    if (!username.trim())
      newErrors.username = 'Required*'

    if (!password.trim())
      newErrors.password = 'Required*'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const onSubmitForm = e => {
    e.preventDefault()

    if (!validate()) return

    const storedUser =
      localStorage.getItem('rf_user')
    const storedPass =
      localStorage.getItem('rf_pass')

    /* ================= REGISTER ================= */
    if (showRegister) {
      localStorage.setItem(
        'rf_user',
        username
      )
      localStorage.setItem(
        'rf_pass',
        password
      )

      alert(
        'Registered Successfully! Please Login.'
      )

      setShowRegister(false)
      setUsername('')
      setPassword('')
      return
    }

    /* ================= LOGIN ================= */
    if (
      username === storedUser &&
      password === storedPass
    ) {
      Cookies.set(
        'jwt_token',
        'recipe_token',
        {expires: 1}
      )

      navigate('/', {replace: true})
    } else {
      setInvalidUser(true)
    }
  }

  return (
    <div className="login-bg">
      <form
        className="login-card"
        onSubmit={onSubmitForm}
      >
        <div className="logo">🍳</div>

        <div className="app-title">
          Recipe Finder
        </div>

        <div className="tagline">
          Cook smart. Eat better.
        </div>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => {
            setUsername(e.target.value)
            setInvalidUser(false)
          }}
        />

        {errors.username && (
          <p className="error">
            {errors.username}
          </p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setInvalidUser(false)
          }}
        />

        {errors.password && (
          <p className="error">
            {errors.password}
          </p>
        )}

        <button type="submit">
          {showRegister
            ? 'Register'
            : 'Login'}
        </button>

        {/* INVALID LOGIN */}
        {invalidUser &&
          !showRegister && (
            <>
              <p className="invalid">
                Invalid user credentials
              </p>

              <button
                type="button"
                className="register-btn"
                onClick={() => {
                  setShowRegister(true)
                  setInvalidUser(false)
                }}
              >
                Signup / Register
              </button>
            </>
          )}

        {/* SWITCH LOGIN */}
        {showRegister && (
          <p
            className="switch"
            onClick={() =>
              setShowRegister(false)
            }
          >
            Already have account?
            Login
          </p>
        )}
      </form>
    </div>
  )
}

export default Login
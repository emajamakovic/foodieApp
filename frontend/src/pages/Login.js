import { useState } from "react"
import '../styles/Login.css'
import { useLogin } from "../hooks/useLogin"


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)

  }

  return (
    <div className="loginform">

    <form className="login" onSubmit={handleSubmit}>
      <h3 className="l-header">LOGIN</h3>

      <div className="l-info">
        <div><input className="l-input"
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        placeholder="Email" />
      </div>

      <div><input className="l-input"
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        placeholder="Password"/>
      </div>

      <button className="b-login" disabled={isLoading}>Log in</button>
      <div className="b-signup-link">Don't have an account? <a href="/signup">Signup</a></div>
      {error && <div className="error">{error}</div>}
      </div>

    </form>
    </div>
  )
}

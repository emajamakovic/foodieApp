import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import '../styles/Signup.css'



export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const {signup, error, isLoading} = useSignup()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      await signup(email, password, name)
    }
  
    return (
      <div className="signupform">

      <form className="signup" onSubmit={handleSubmit}>
        <h3 className="s-header">SIGN UP</h3>
        
        <div className="s-info">
        <div>
            <input className="s-input"
              type="name" 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              placeholder="Name"
            />
          </div>
          <div>
            <input className="s-input"
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              placeholder="Email"
            />
          </div>
        <div>
          <input className="s-input"
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            placeholder="Password"
          />
        </div>
  
        <button className="s-signup" disabled={isLoading}>Sign up</button>
        <div className="s-login-link">Already have an account? <a href="/login">Login</a></div>
        {error && <div className="error">{error}</div>}
        </div>

      </form>
      </div>

    )
}


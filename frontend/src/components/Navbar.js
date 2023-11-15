import React from 'react';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }
    return (
        <div className='navbar'>
          <Link to={'/'} className='name'><div>FOODIE</div>  </Link>
          <div className='objects'>
          <Link to={'/login'}><div>Login</div></Link>
          <Link to={'/signup'}><div>Signup</div></Link>
          <button className='logout' onClick={handleClick}>Logout</button>
          </div>

        </div>
    )
}
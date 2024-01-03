import React from 'react';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { CgProfile } from "react-icons/cg";


export default function Navbar() {
  const { logout } = useLogout()
  var userData = localStorage.getItem('user');
  var user = JSON.parse(userData);



  const handleClick = () => {
    logout()
  }
    return (
        <div className='navbar'>
          <Link to={'/'} className='name'><div>FOODIE</div>  </Link>
          <div className='objects'>
            {user!=null  ? (
            <div className='nav-container1'>
            <div className='username'>{user.name}</div>
            <button className='logout' onClick={handleClick}>Logout</button>
            <Link to={'/profile'}><CgProfile className='profileicon'/></Link>
            </div>) :
            (<div className='nav-container1'>
              <Link to={'/login'}><div>Login</div></Link>
            <Link to={'/signup'}><div>Signup</div></Link>
            </div>)}
          </div>

        </div>
    )
}
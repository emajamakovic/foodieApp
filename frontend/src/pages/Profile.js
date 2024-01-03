import React from "react";
import photo from '../photos/profile-image.png';
import  '../styles/Profile.css';
import UserPosts from "../components/UserPosts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Profile() {
    const navigate = useNavigate();
    var userData = localStorage.getItem('user');
    var user = JSON.parse(userData);

  
      useEffect(() => {
          // Redirect to login page if user is null
          if (!user) {
            navigate('/login');
          }
        }, [user, navigate]);
  

    return(
        <div className="profile">
            <div className="user-info-container">
                <div className="user-info">
                    <img src={photo}></img>
                    <div className="p-username">{user.name}</div>
                    <div className="p-email">{user.email}</div>
                </div>
            </div>
            
            <UserPosts/>
        </div>
    )
}
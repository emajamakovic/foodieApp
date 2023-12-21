import React from "react";
import photo from '../photos/profile-image.png';
import  '../styles/Profile.css';
import UserPosts from "../components/UserPosts";


export default function Profile() {
    var userData = localStorage.getItem('user');
    var user = JSON.parse(userData);
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
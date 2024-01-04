import React from "react";
import '../styles/SingleRestaurant.css'
import {  GoHeartFill } from "react-icons/go";
import { useState , useEffect} from "react";


export default function SingleRestaurant(props) {

    const [isHovered, setIsHovered] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(props.likes);
  
    React.useEffect(() => {
        // Simulating an asynchronous update to the server
        const updateLikesOnServer = async () => {
          try {
            // Assuming you have an API endpoint to update likes
            const response = await fetch(`https://foodie-app-uz37.onrender.com/restaurant/${props._id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ likes: likeCount }),
            });
    
            if (response.ok) {
              console.log('Likes updated on the server');
            } else {
              console.error('Failed to update likes on the server');
              // Revert to the previous state if the update fails
              setLikeCount((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
              setIsLiked((prevIsLiked) => !prevIsLiked);
            }
          } catch (error) {
            console.error('Error updating likes on the server', error);
            // Revert to the previous state if there's an error
            setLikeCount((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
            setIsLiked((prevIsLiked) => !prevIsLiked);
          }
        };
        updateLikesOnServer();
    }, [isLiked, likeCount]);

    const toggleVisibility = () => {
        setIsHovered(!isHovered);
    }

    const handleLikeToggle = () => {
        setLikeCount((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
        setIsLiked((prevIsLiked) => !prevIsLiked);
      };
    
    return (
        <div className="sr-container">
        <div className="singlerestaurant" onMouseEnter={toggleVisibility} onMouseLeave={toggleVisibility}>
            <div className="sres-img">
                <img src={require(`../uploads/${props.image.name}`)}/>
                </div>
            <div className="sres-workingTime">{props.workingTime}</div>
            <div className="sres-container3">
            <div className="sres-name">{props.name}</div>
            <div className="sres-likes"><div>{likeCount}</div><GoHeartFill className="heart-icon" onClick={handleLikeToggle}  style={{ color: isLiked ? 'pink' : 'gray' }}/></div>
            </div>
            <div className="sres-cuisines" id="cuisines">{props.cuisines}</div>

            <div className={`sres-container2 ${isHovered ? 'visible' : ''}`}>
            <div>{props.number}</div>
            <div>{props.email}</div>
            <div>{props.address}</div>

            </div>
        </div>
        </div>
    )
}
import React from "react";
import '../styles/SingleRestaurant.css'
import {  GoHeartFill } from "react-icons/go";
import { useState , useEffect} from "react";


export default function SingleRestaurant(props) {

    const [isHovered, setIsHovered] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);
    const [likedByString, setLikedByString] = React.useState(props.likedBy || []);
    const [likeCount, setLikeCount] = React.useState(props.likes);

    var userData = localStorage.getItem('user');
    var user = JSON.parse(userData);
  

    React.useEffect(() => {
      // Check if the current user's name is in the list of likedBy
      const userLikedThisRecipe = props.likedBy && props.likedBy.includes(user?.email);
      setIsLiked(userLikedThisRecipe);
    }, []);


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
              body: JSON.stringify({ likes: likeCount, likedBy: likedByString }),
            });
    
            if (response.ok) {
              console.log('Likes updated on the server');
            } else {
              console.error('Failed to update likes on the server');
              // Revert to the previous state if the update fails
              setLikeCount((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
              setIsLiked((prevIsLiked) => !prevIsLiked);
              setLikedByString((prevLikedByString) => {
                // If liking, add the user to likedByString
                if (!isLiked) {
                  return [...(prevLikedByString || []), user.email];
                }
                // If unliking, remove the user from likedByString
                const updatedLikedBy = (prevLikedByString || []).filter((userName) => userName !== user.email);
                return updatedLikedBy;
              });
            }
          } catch (error) {
            console.error('Error updating likes on the server', error);
            // Revert to the previous state if there's an error
            setLikeCount((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
            setIsLiked((prevIsLiked) => !prevIsLiked);
            setLikedByString((prevLikedByString) => {
              // If liking, add the user to likedByString
              if (!isLiked) {
                return [...(prevLikedByString || []), user.email];
              }
              // If unliking, remove the user from likedByString
              const updatedLikedBy = (prevLikedByString || []).filter((userName) => userName !== user.email);
              return updatedLikedBy;
            });
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
        setLikedByString((prevLikedByString) => {
          // If liking, add the user to likedByString
          if (!isLiked) {
            return [...(prevLikedByString || []), user.email];
          }
          // If unliking, remove the user from likedByString
          const updatedLikedBy = (prevLikedByString || []).filter((userName) => userName !== user.email);
          return updatedLikedBy;
        });
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
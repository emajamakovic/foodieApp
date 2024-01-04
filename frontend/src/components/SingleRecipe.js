import React from "react";
import '../styles/SingleRecipe.css';
import { Link } from 'react-router-dom';
import {  GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";




export default function SingleRecipe(props) {
    const [isLiked, setIsLiked] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(props.likes);
  const navigate = useNavigate();
  var userData = localStorage.getItem('user');
  var user = JSON.parse(userData);

    React.useEffect(() => {
        // Simulating an asynchronous update to the server
        const updateLikesOnServer = async () => {
          try {
            // Assuming you have an API endpoint to update likes
            const response = await fetch(`https://foodie-app-uz37.onrender.com/recipe/${props._id}`, {
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


    const handleLikeToggle = () => {
      if (!user) {
        navigate('/login');
      }
        setLikeCount((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
        setIsLiked((prevIsLiked) => !prevIsLiked);
      };
    
    return (
        <div>
       <Link to={`/explore/${props._id}`}>
        <div className="singlerecipe">
            <div className="sr-img"><img src={require(`../uploads/${props.image.name}`)}/></div>
            <div className="sr-category">{props.category}</div>
            <div className="sr-name">{props.name}</div>
            
        </div>
        </Link> 
        <div className="sr-container1">
        <div className="sr-duration">{props.duration}</div>
        <div className="sres-likes">
            <div>{likeCount}</div>
            <GoHeartFill className="heart-icon" onClick={handleLikeToggle}  style={{ color: isLiked ? 'pink' : 'gray' }}/>
            </div>
            </div>
            </div>
    )
}
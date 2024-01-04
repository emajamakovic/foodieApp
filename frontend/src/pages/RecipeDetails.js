import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/RecipeDetails.css';
import { BsClock } from "react-icons/bs";
import { IoCaretBack  } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';




export default function RecipeDetails() {

    const [recipe, setRecipe] = React.useState([]);
    const { id } = useParams();
    const [ingredientsString, setIngredients]= React.useState('');
    const directions=recipe.directions;
    const [user, setUser]=React.useState();
    const [userEmail, setUserEmail]=React.useState();

    const navigate = useNavigate();
    const location = useLocation();
    var userData = localStorage.getItem('user');
    var userStorage = JSON.parse(userData);


    React.useEffect(() => {
        // Redirect to login page if user is null
        if (!userStorage) {
          navigate('/login');
        }
      }, [userStorage, navigate]);


    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`https://foodie-app-uz37.onrender.com/recipe/${id}`)
            const data = await response.json()

            if (response.ok) {
                setRecipe(data)
                setIngredients(data.ingredients)
                setUserEmail(data.postedBy)
            }
        };
        fetchRecipe();

        
        if (userEmail) {
            fetchUser();
        }
    }, [ userEmail]);

        const fetchUser = async () => {
            const response = await fetch(`http://localhost:3000/user/byemail/${userEmail}`)
            const data = await response.json()

            if (response.ok) {
                setUser(data)
                console.log(data)
            }
        };


    return (
        <div className="recipedetails"> 
            <div className="rd-container">
            {recipe.image && (
                <div className="rd-img">
                    <img src={require(`../uploads/${recipe.image.name}`)} alt={recipe.name} />

                </div>
            )}

            {/* Image and name with duration of recipe */}
            <div className="rd-container2">
                <div className="back-button"><a href="/explore/recipe"><IoCaretBack />Back</a></div> 
                <div className="rd-name">{recipe.name}</div>
                    <div className="rd-category">{recipe.category}</div>
                    <div className="rd-clock">
                        <BsClock size="1.5em"/>
                        <div className="rd-duration">{recipe.duration}</div>
                    </div>
               {user && <div className="rd-postedBy">Posted by: {user.name}</div>}
            </div>
            </div>

            <div className="rd-ingredients">
                <div className="rdi-name">INGREDIENTS</div>

            {ingredientsString && (
                <ul className="ingredient-list">
                {ingredientsString[0].split(',').map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            )}
            </div>

                {recipe.directions && (
                    <div className="rd-directions">
                    <ul>
                    {directions.split(/\d+\./).filter(Boolean).map((direction, index) => (
                        <li key={index}>{`${index + 1}. ${direction.trim()}`}</li>
                    ))}
                </ul>
                </div>
                )}
                
             
    </div>
    )
}
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/RecipeDetails.css';
import { BsClock } from "react-icons/bs";


export default function RecipeDetails() {

    const [recipe, setRecipe] = React.useState([]);
    const { id } = useParams();
    const [ingredientsString, setIngredients]= React.useState('');
    const directions=recipe.directions;

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`http://localhost:3000/recipe/${id}`)
            const data = await response.json()

            if (response.ok) {
                setRecipe(data)
                setIngredients(data.ingredients)
            }
        }
        fetchRecipe();


    }, []);

    return (
        <div className="recipedetails"> 
            <div className="rd-container">
            {recipe.image && (
                <div className="rd-img"><img src={require(`../uploads/${recipe.image.name}`)} alt={recipe.name} /></div>
            )}

            {/* Image and name with duration of recipe */}
            <div className="rd-container2">
            <div className="rd-name">{recipe.name}</div>
                <div className="rd-clock">
                    <BsClock size="1.5em"/>
                    <div className="rd-duration">{recipe.duration}</div>
                </div>
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
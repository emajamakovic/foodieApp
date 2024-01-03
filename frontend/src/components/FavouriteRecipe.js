import React from "react";
import '../styles/FavouriteRecipe.css';
import { Link } from "react-router-dom";

export default function FavouriteRecipe() {
    const [recipe, setRecipe]=React.useState();

    React.useEffect(() => {

        const fetchRecipe = async () => {
            const response = await fetch('http://localhost:3000/recipe/likes/')
            const data = await response.json()

            if (response.ok) {
                if (Array.isArray(data) && data.length > 0) {
                    setRecipe(data[0]); // Set the first element of the array
                  }
                  }
        }

        fetchRecipe();


    }, [])

return (
    <div className="fr-container5">
        {recipe && 
        <div className="favouriterecipe">
        <div><img className="fr-image" src={require(`../uploads/${recipe.image.name}`)} /></div>
        <div className="fr-container6">
            <div className="fr-header">Recipe with the most likes</div>
            <div className="fr-name">{recipe.name}</div>
            <div className="fr-text">The joy of enjoying food is a sensory journey that begins with the anticipation of 
                aromas wafting through the air, captivating taste buds before the first bite.
                 Each morsel becomes a palette of textures and tastes, a dance of sweet and savory notes that harmonize on the tongue.
                  Testing the boundaries of culinary creation becomes a thrilling adventure, we encourage you to try.</div>
            <div><Link to={`/explore/${recipe._id}`} className="fr-linkbutton">Try it now</Link></div>


            </div>
        </div>
        }
        
    </div>
)
}
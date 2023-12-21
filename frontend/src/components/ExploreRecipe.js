import React, { useEffect } from "react";
import SingleRecipe from "./SingleRecipe";
import '../styles/ExploreRecipe.css';

export default function ExploreRecipe() {
    const [allRecipes, setAllRecipes] = React.useState([]);


    useEffect(() => {

        const fetchRecipes = async () => {
            const response = await fetch('http://localhost:3000/recipe/')
            const data = await response.json()

            if (response.ok) {
                setAllRecipes(data)
            }
        }

        fetchRecipes();


    }, [])


    const recipes = allRecipes.map(recipe => {
        return (
            <SingleRecipe
                key={recipe.id}
                {...recipe}
            />
        )
    })
    return (
        <div className="explorerecipe">
            <div className="buttons">
            <button>Breakfast</button>
            <button>Lunch</button>
            <button>Dinner</button>
            <button>Dessert</button>
            </div>
        <div className="recipelisting">
            {recipes}
        </div>
        </div>
    )
}
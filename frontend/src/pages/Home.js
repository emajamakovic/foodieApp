import React from "react";
import Main from "../components/Main";
import FoodQuotes from "../components/FoodQuotes";
import SingleRecipe from "../components/SingleRecipe";
import '../styles/Home.css';
import FavouriteRecipe from "../components/FavouriteRecipe";

export default function Home() {
    const [allRecipes, setAllRecipes] = React.useState([]);


    React.useEffect(() => {

        const fetchRecipes = async () => {
            const response = await fetch('https://foodie-app-uz37.onrender.com/recipe/')
            const data = await response.json()

            if (response.ok) {
                setAllRecipes(data.slice(0,3))
            }
        }

        fetchRecipes();


    }, [])

    const recipesuggestion =allRecipes.map(recipe => {
        return (
            <SingleRecipe
            key={recipe._id}
            {...recipe}
            />

        )
    })
    return (
        <div>
            <Main/>
            <div className="fq-column-name">Our famous recipes</div>
            <div className="recipesuggestion">{recipesuggestion}</div>
            <FoodQuotes/>
            <FavouriteRecipe/>

        </div>
    )
}
import React, { useEffect } from "react";
import SingleRecipe from "./SingleRecipe";
import '../styles/ExploreRecipe.css';

export default function ExploreRecipe() {
    const [allRecipes, setAllRecipes] = React.useState([]);
    const [visibleRecipes, setVisibleRecipes] = React.useState([]);
    const [input, setInput] = React.useState("");



    React.useEffect(() => {

        const fetchRecipes = async () => {
            const response = await fetch('https://foodie-app-uz37.onrender.com/recipe/')
            const data = await response.json()

            if (response.ok) {
                setAllRecipes(data)
                setVisibleRecipes(data)
            }
        }

        fetchRecipes();


    }, [])

    const fetchData = (value) => {
        fetch("https://foodie-app-uz37.onrender.com/recipe/")
          .then((response) => response.json())
          .then((json) => {
            const results = json.filter((recipe) => {
              return (
                value &&
                recipe &&
                recipe.name &&
                recipe.name.toLowerCase().includes(value)
              );
            });
            setVisibleRecipes(results);
          });
      };

    const handleChange = (value) => {
        setInput(value);
        if (value === "") {
            setVisibleRecipes(allRecipes);
        } else {
            fetchData(value);
        }
        
      };


    const recipes = visibleRecipes.map(recipe => {
        return (
            <SingleRecipe
                key={recipe.id}
                {...recipe}
            />
        )
    })
    return (
        <div className="explorerecipe">
            <div className="searchfunctionality">
            <input
            placeholder="Type to search..."
            value={input}
            onChange={(e) => handleChange(e.target.value) }
        
      />
      </div>
        <div className="recipelisting">
            {recipes}
        </div>
        </div>
    )
}
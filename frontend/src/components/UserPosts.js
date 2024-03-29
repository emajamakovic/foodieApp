import React from "react";
import { useEffect } from "react";
import SingleUserRecipe from "./SingleUserRecipe";
import '../styles/UserPosts.css';
import SingleUserRestaurant from "./SingleUserRestaurant";
import '../styles/SingleRestaurant.css';

export default function UserPosts() {
    const [allRecipes, setAllRecipes] = React.useState([]);
    const [allRestaurants, setAllRestaurants] = React.useState([]);

    var userData = localStorage.getItem('user');
    var user = JSON.parse(userData);

    useEffect(() => {

        const fetchRecipes = async () => {
            const response = await fetch(`https://foodie-app-uz37.onrender.com/recipe/user/${user.email}`)
            const data = await response.json()

            if (response.ok) {
                setAllRecipes(data)
            }
        }

        const fetchRestaurants = async () => {
            const response = await fetch(`https://foodie-app-uz37.onrender.com/restaurant/user/${user.email}`)
            const data = await response.json()

            if (response.ok) {
                setAllRestaurants(data)

            }
        }

        fetchRecipes();
        fetchRestaurants();



    }, [])

    const userRecipes=allRecipes.map(recipe => {
        return (
            <SingleUserRecipe
                key={recipe.id}
                {...recipe}
            />
        )
    })

    const userRestaurants=allRestaurants.map(restaurant => {
        return(
            <SingleUserRestaurant
                key={restaurant.id}
                {...restaurant}

            />
        )
    })


        return (
        <div className="userposts">
            <div className="up-recipe">Recipes</div>
            {allRecipes== null || allRecipes == '' ? <div className="nouserrecipe">No recipe posts</div> : <div className="userrecipe">{userRecipes}</div>}

            <div className="up-restaurants">Restaurants</div>
            {allRestaurants== null || allRestaurants == '' ? <div className="nouserrestaurants">No restaurant posts</div> : <div className="userrestaurants">{userRestaurants}</div>}

        </div>
    )
}
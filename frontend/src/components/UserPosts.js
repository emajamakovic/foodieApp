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
            const response = await fetch(`http://localhost:3000/recipe/user/${user.email}`)
            const data = await response.json()

            if (response.ok) {
                setAllRecipes(data.slice(0,4))
            }
        }

        const fetchRestaurants = async () => {
            const response = await fetch(`http://localhost:3000/restaurant/user/${user.email}`)
            const data = await response.json()

            if (response.ok) {
                setAllRestaurants(data.slice(0,4))
                console.log(allRestaurants)

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
            <div className="userrecipe">{userRecipes}</div>
            <div className="up-restaurants">Restaurants</div>
            <div className="userrestaurants">{userRestaurants}</div>
        </div>
    )
}
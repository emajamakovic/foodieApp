import React, { useEffect } from "react";
import SingleRestaurant from "./SingleRestaurant";
import '../styles/ExploreRestaurant.css';

export default function ExploreReview() {
    const [allRestaurants, setAllRestaurants] = React.useState([]);


    useEffect(() => {

        const fetchRestaurants = async () => {
            const response = await fetch('http://localhost:3000/restaurant/')
            const data = await response.json()

            if (response.ok) {
                setAllRestaurants(data)
            }
        }

        fetchRestaurants();


    }, [])


    const restaurants = allRestaurants.map(restaurant => {
        return (
            <SingleRestaurant
                key={restaurant.id}
                {...restaurant}
            />
        )
    })
    return (
        <div className="explorerestaurant">
            {restaurants}
        </div>
    )
}
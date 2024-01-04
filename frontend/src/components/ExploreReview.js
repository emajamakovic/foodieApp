import React, { useEffect } from "react";
import SingleRestaurant from "./SingleRestaurant";
import '../styles/ExploreRestaurant.css';

export default function ExploreReview() {
    const [allRestaurants, setAllRestaurants] = React.useState([]);
    const [visibleRestaurants, setVisibleRestaurants] = React.useState([]);
    const [input, setInput] = React.useState("");


    useEffect(() => {

        const fetchRestaurants = async () => {
            const response = await fetch('https://foodie-app-uz37.onrender.com/restaurant/')
            const data = await response.json()

            if (response.ok) {
                setAllRestaurants(data)
                setVisibleRestaurants(data)
            }
        }

        fetchRestaurants();


    }, [])

    const fetchData = (value) => {
        fetch("https://foodie-app-uz37.onrender.com/restaurant/")
          .then((response) => response.json())
          .then((json) => {
            const results = json.filter((restaurant) => {
              return (
                value &&
                restaurant &&
                restaurant.name &&
                restaurant.name.toLowerCase().includes(value)
              );
            });
            setVisibleRestaurants(results);
          });
      };

    const handleChange = (value) => {
        setInput(value);
        if (value === "") {
            setVisibleRestaurants(allRestaurants);
        } else {
            fetchData(value);
        }
        
      };


    const restaurants = visibleRestaurants.map(restaurant => {
        return (
            <SingleRestaurant
                key={restaurant.id}
                {...restaurant}
            />
        )
    })
    return (
        <div>
            <div className="searchfunctionality">
            <input
            placeholder="Type to search..."
            value={input}
            onChange={(e) => handleChange(e.target.value) }
        
      />
      </div>
        <div className="explorerestaurant">
            {restaurants}
        </div>
        </div>
    )
}
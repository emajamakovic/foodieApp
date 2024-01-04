import React from "react";
import '../styles/AddRestaurant.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


export default function EditRestaurant() {
    const [restaurant, setRestaurant]=React.useState();
    const [restaurantName, setRestaurantName]=React.useState();
    const [priceRange, setPriceRange]=React.useState();
    const [cuisines, setCuisines]=React.useState();
    const [email, setEmail]=React.useState();
    const [number, setNumber]=React.useState();
    const [workingTime, setWorkingTime]=React.useState();
    const [address, setAddress]=React.useState();
    const [image, setImage] = React.useState();
    const [error, setError]= React.useState(false);
    const navigate = useNavigate();
    var userData = localStorage.getItem('user');
    var user = JSON.parse(userData);

    const location = useLocation();
    const restaurantId = location.state;
    //const [latitude, setLatitude] = React.useState();
    //const [longitude, setLongitude] = React.useState();
    //const [position, setPosition] = React.useState();


    //const handleLocationChange = (event) => {
     //   setLocation(event.target.value);
      //  Geo();
   // }
/*
    function Geo() {
      const apiKey = '747d0cfdf03b4dfaa0bf2d804be1931d';
          const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`;
      

    axios
      .get(geocodingUrl)
      .then((response) => {
        if (response.data.results.length > 0) {
          // Extract latitude and longitude from the API response
          const result = response.data.results[0].geometry;
          setLatitude(result.lat);
          setLongitude(result.lng);
          setPosition([result.lat, result.lng]);
          console.log(latitude, longitude)
        } else {
          // Handle geocoding error
          console.error('Geocoding API error');
        }
      })
      .catch((error) => {
        console.error('Error making geocoding request:', error);
      });
      };
    
      
*/
    
React.useEffect(() => {
    const fetchRestaurant = async () => {
        const response = await fetch(`https://foodie-app-uz37.onrender.com/restaurant/${restaurantId}`)
        const data = await response.json()

        if (response.ok) {
            setRestaurant(data);
        }
    };
    fetchRestaurant();          
  },[restaurantId]);

  const handleChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/restaurant/${restaurantId}`, {
        method: 'PATCH', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurant),
      });

      if (response.ok) {
        console.log('Restaurant updated successfully');
        window.location.replace('/profile');
        // Handle success, e.g., redirect or show a success message
      } else {
        console.error('Failed to update restaurant:', response.statusText);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

    return (
        
        <div className="addrestaurant">
            {restaurant &&
            <div>
            <div className="re-name">
              <input  onChange={handleChange} type="text" name="name" defaultValue={restaurant.name} class="form-control" id="restaurantName-input" required=""/>
            </div>

        	<div className="re-container1">
            <div className="re-price">
                <label>Price range</label>
              <input  onChange={handleChange} type="text" name="priceRange" defaultValue={restaurant.priceRange} class="form-control" id="priceRange-input" required=""/>
            </div>
            <div className="re-cuisines">
                <label>Cuisines</label>
              <input  onChange={handleChange} type="text" name="cuisines" defaultValue={restaurant.cuisines} class="form-control" id="cuisines-input" required=""/>
            </div>
            <div className="re-email">
                <label>Email</label>
              <input  onChange={handleChange} type="text" name="email" defaultValue={restaurant.email} class="form-control" id="email-input" required=""/>
            </div>
            <div className="re-number">
                <label>Number</label>
              <input  onChange={handleChange} type="text" name="number" defaultValue={restaurant.number} class="form-control" id="number-input" required=""/>
            </div>
            <div className="re-workingTime">
                <label>Working time</label>
              <input  onChange={handleChange} type="text" name="workingTime" defaultValue={restaurant.workingTime} class="form-control" id="workingTime-input" required=""/>
            </div>
            <div className="re-location">
                <label>Address</label>
              <input  onChange={handleChange} type="text" name="address" defaultValue={restaurant.address} class="form-control" id="location-input" required=""/>
            </div>
            
            </div>
            <div className="re-button"><button onClick={handleUpdate}>Update</button></div>
            {error && <div className="re-error">All fields must be filled.</div>}


            
        </div>}
        </div>
        
    )
}
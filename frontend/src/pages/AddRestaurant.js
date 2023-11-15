import React from "react";
import '../styles/AddRestaurant.css';
import axios from 'axios';

export default function AddRestaurant() {
    const [restaurantName, setRestaurantName]=React.useState();
    const [priceRange, setPriceRange]=React.useState();
    const [cuisines, setCuisines]=React.useState();
    const [email, setEmail]=React.useState();
    const [number, setNumber]=React.useState();
    const [workingTime, setWorkingTime]=React.useState();
    const [address, setAddress]=React.useState();
    const [location, setLocation] = React.useState();
    const [image, setImage] = React.useState();
    const [error, setError]= React.useState(false);


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

    const userData = localStorage.getItem('user');
    // Parse the JSON data
    const user = JSON.parse(userData);
    
  const createRestaurant = async () => {
    const url = 'http://localhost:3000/restaurant/';

    if (!restaurantName || !priceRange || !cuisines || !email || !number || !workingTime || !address || !image) {
      setError(true);
      // You might want to display an error message to the user here
      return false;
    }
  
    const formData = new FormData();
    formData.append('name', restaurantName);
    formData.append('priceRange', priceRange);
    formData.append('cuisines', cuisines);
    formData.append('postedBy', user.name);
    formData.append('email', email);
    formData.append('number', number);
    formData.append('workingTime', workingTime);
    formData.append('address', address);
    formData.append('image', image);


  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const restaurant = await response.json();
        console.log('Restaurant created:', restaurant);
        window.location.href='http://localhost:3001/';
      } else {
        const error = await response.json();
        console.error('Failed to create restaurant:', error);
      }
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      window.location.href='http://localhost:3001/';

    }
  };

    return (
        <div className="addrestaurant">
            <div className="re-name">
              <input  onChange={(e)=>setRestaurantName(e.target.value)} type="text" placeholder="Restaurant name" class="form-control" id="restaurantName-input" required=""/>
            </div>

        	<div className="re-container1">
            <div className="re-price">
                <label>Price range</label>
              <input  onChange={(e)=>setPriceRange(e.target.value)} type="text" placeholder="8 BAM - 12 BAM" class="form-control" id="priceRange-input" required=""/>
            </div>
            <div className="re-cuisines">
                <label>Cuisines</label>
              <input  onChange={(e)=>setCuisines(e.target.value)} type="text" placeholder="Barbecue" class="form-control" id="cuisines-input" required=""/>
            </div>
            <div className="re-email">
                <label>Email</label>
              <input  onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="example@gmail.com" class="form-control" id="email-input" required=""/>
            </div>
            <div className="re-number">
                <label>Number</label>
              <input  onChange={(e)=>setNumber(e.target.value)} type="text" placeholder="+38761000000" class="form-control" id="number-input" required=""/>
            </div>
            <div className="re-workingTime">
                <label>Working time</label>
              <input  onChange={(e)=>setWorkingTime(e.target.value)} type="text" placeholder="8 AM- 4 PM" class="form-control" id="workingTime-input" required=""/>
            </div>
            <div className="re-location">
                <label>Address</label>
              <input  onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="2025 M Street" class="form-control" id="location-input" required=""/>
            </div>
            <div className="re-image">
              <label>Image</label>
              <input type="file" accept="image/*" name="image" id="image-input"onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            </div>
            <div className="re-button"><button onClick={createRestaurant}>Submit</button></div>
            {error && <div className="re-error">All fields must be filled.</div>}


            
        </div>
    )
}
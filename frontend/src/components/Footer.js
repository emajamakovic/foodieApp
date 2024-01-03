import React from "react";
import '../styles/Footer.css';

export default function Footer(){
    return (
        <footer class="site-footer">
            <div class="footer-content">
              <div className="content1">
                <div className="f-sitename">FOODIE</div>
                <ul className="footer-list">
                  <li><a href="/">Home</a></li>
                  <li><a href="/login">Login</a></li>
                  <li><a href="/signup">Signup</a></li>
                </ul>
              </div>

              <div className="content2">
              <ul className="footer-list">
                  <li><a href="/addrecipe">Add Recipe</a></li>
                  <li><a href="/addrestaurant">Add Restaurant</a></li>


                </ul>
              </div>

              <div className="content2">
              <ul className="footer-list">
              <li><a href="/explore/recipe">Explore Recipes</a></li>
                  <li><a href="/explore/restaurant">Explore Restaurants</a></li>

                </ul>
              </div>

 
    </div>
  </footer>
    )
}
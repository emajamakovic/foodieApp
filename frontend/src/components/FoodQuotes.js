import React from "react";
import food from '../photos/quote1img.jpg';
import chef from '../photos/chef.jpg';

import '../styles/FoodQuotes.css';
export default function FoodQuotes() {
    return (
        <div className="food-quality-quotes">
           <div className="fq-quote">
            <div className="fq-image">
            <div><img className="fq-img-food" src={food}/></div>
            </div>
            <div className="fq-text">
                <div className="fq-text-header">High quality food</div>
                <div className="fq-text-quote">Food quality is the quality characteristics of food that is acceptable to consumers. This includes external factors as appearance, texture, and flavour; factors such as federal grade standards and internal. Food quality in the United States is enforced by the Food Safety Act 1990. Members of the public complain to trading standards professionals, who submit complaint samples and also samples used to routinely monitor the food marketplace to public analysts.</div>
            </div>
            </div> 

            <div className="fq-quote">
            <div className="fq-text">
                <div className="fq-text-header">Chef Interviews</div>
                <div className="fq-text-quote">Meet the celeb chefs, TV chefs, famous chefs and top chefs from different regions. We talk to them about what it’s really like in the kitchen, their inspiration when coming up with new concepts, their favourite dish to cook. We get behind the scenes on their suppliers and talk about how they source produce to plate up to you.</div>
            </div>
            <div className="fq-image">
            <div className="fq-img-chef"><img src={chef}/></div>
            </div>
            </div> 
            
        </div>
    )
}
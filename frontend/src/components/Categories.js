import React from "react";
import '../styles/Categories.css';

export default function Categories() {
    return (
        <div className="by-category">
            <div className="c-column-name">Explore by category</div>
            <div className="categories">
           <div>Breakfast</div>
           <div>Lunch</div>
           <div>Dinner</div>
           <div>Dessert</div>
           </div>
        </div>
    )
}

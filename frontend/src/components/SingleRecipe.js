import React from "react";
import '../styles/SingleRecipe.css';
import { Link } from 'react-router-dom';


export default function SingleRecipe(props) {
    
    return (
       <Link to={`/explore/${props._id}`}>
        <div className="singlerecipe">
            <div className="sr-img"><img src={require(`../uploads/${props.image.name}`)}/></div>
            <div className="sr-category">{props.category}</div>
            <div className="sr-name">{props.name}</div>
                <div className="sr-duration">{props.duration}</div>

        </div>
        </Link> 
    )
}
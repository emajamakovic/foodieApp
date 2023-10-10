import React from "react";
import photo from '../photos/Black Yellow Modern Healthy Food Instagram Post.png';
import '../styles/Main.css'
import { Link } from 'react-router-dom'


export default function Main() {
    return (
        <div className="main">
            <div className="main-container1">
                <div className="description">
                <div className="desc-header">Best food for your taste</div>
                <div>Find somthing to write here</div>
                <div className="main-container2"> 
                <button className="bttn-explore">EXPLORE</button> 
                <Link to={`/addrecipe`}><button  className="bttn-add">ADD RECIPE</button></Link>
                </div>
                </div>
            </div>
           <div className="image">
           <img src={photo}/>
            </div> 
        </div>
    )
}

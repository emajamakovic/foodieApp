import React from "react";
import '../styles/SingleRestaurant.css'


export default function SingleRestaurant(props) {

    const [isHovered, setIsHovered] = React.useState(false);

    const toggleVisibility = () => {
        setIsHovered(!isHovered);
    }

    
    return (
        <div className="sr-container">
        <div className="singlerestaurant" onMouseEnter={toggleVisibility} onMouseLeave={toggleVisibility}>
            <div className="sres-img"><img src={require(`../uploads/${props.image.name}`)}/></div>
            <div className="sres-workingTime">{props.workingTime}</div>
            <div className="sres-name">{props.name}</div>
            <div className="sres-cuisines" id="cuisines">{props.cuisines}</div>

            <div className={`sres-container2 ${isHovered ? 'visible' : ''}`}>
            <div>{props.number}</div>
            <div>{props.email}</div>
            <div>{props.address}</div>

            </div>
        </div>
        </div>
    )
}
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
            <div className="sr-img"><img src={require(`../uploads/${props.image.name}`)}/></div>
            <div className="sr-workingTime">{props.workingTime}</div>
            <div className="sr-name">{props.name}</div>
            <div className="sr-cuisines" id="cuisines">{props.cuisines}</div>

            <div className={`sr-container2 ${isHovered ? 'visible' : ''}`}>
            <div>{props.number}</div>
            <div>{props.email}</div>
            <div>{props.address}</div>

            </div>
        </div>
        </div>
    )
}
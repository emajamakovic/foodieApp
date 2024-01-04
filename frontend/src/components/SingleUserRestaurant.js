import React from "react";
import '../styles/SingleRestaurant.css'
import '../styles/UserPosts.css';
import { Modal } from "./Modal";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

export default function SingleUserRestaurant(props) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const restaurantId=props._id;

  const handleButtonClick = (value) => {
    setModalOpen(false);
    setMessage(value);
  };


    const handleDelete = async () => {
        try {
          const response = await fetch(`https://foodie-app-uz37.onrender.com/restaurant/${props._id}`, {
            method: 'DELETE', // Make sure to set the method to 'DELETE'
          });
      
          const json = await response.json();
      
          if (response.ok) {
            console.log('Deleted');
            setModalOpen(false);
            window.location.reload();
            // Handle any UI updates or state changes after successful deletion
          } else {
            console.error('Failed to delete recipe:', json.error || 'Unknown error');
            // Handle error as needed
          }
        } catch (error) {
          console.error('Error deleting recipe:', error.message);
          // Handle error as needed
        }
      };

    return (
        <div className="sr-container">
        <div className="singleuserrestaurant">
            <div className="sres-img"><img src={require(`../uploads/${props.image.name}`)}/></div>
            <div className="sres-workingTime">{props.workingTime}</div>
            <div className="sres-name">{props.name}</div>
            <div className="sres-cuisines" id="cuisines">{props.cuisines}</div>
            </div>
            <div className="sur-edit">
        <Link className="sur-editrestaurant" to={'/editrestaurant'} state={restaurantId}><button>Edit</button></Link>
        <button className="sur-deleterestaurant" onClick={() => setModalOpen(true)}>Delete</button>
        
        </div>
        {modalOpen &&
        createPortal(
          <Modal
            closeModal={handleButtonClick}
            onSubmit={handleDelete}
            onCancel={handleButtonClick}
          >
            <div className="modal-header">Are you sure you want to delete this post?</div>
            <br />
          </Modal>,
          document.body
        )}
        </div>
    )
}
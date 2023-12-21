import React from "react";
import '../styles/SingleRecipe.css';
import { Link } from 'react-router-dom';
import '../styles/UserPosts.css';
import { Modal } from "./Modal";
import { createPortal } from "react-dom";
import { useState } from "react";
import { Location } from "react-router-dom";



export default function SingleRecipe(props) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const recipeId=props._id;

  const handleButtonClick = (value) => {
    setModalOpen(false);
    setMessage(value);
  };
  



    const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:3000/recipe/${props._id}`, {
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
    
    return (<div>
       <Link to={`/explore/${props._id}`}>
        <div className="singlerecipe">
            <div className="sr-img"><img src={require(`../uploads/${props.image.name}`)}/></div>
            <div className="sr-category">{props.category}</div>
            <div className="sr-name">{props.name}</div>
            <div className="sr-duration">{props.duration}</div>

        </div>
        </Link> 
        <div className="sr-edit">
        <Link to={'/editrecipe'} state={recipeId} className="sr-editrecipe"><button >Edit</button></Link>
        <button onClick={() => setModalOpen(true)} className="sr-deleterecipe">Delete</button>
        
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
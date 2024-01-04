import React from "react";
import '../styles/AddRecipe.css'
import Select from "react-select";
import { useNavigate, useLocation } from 'react-router-dom';


export default function EditRecipe() {

  const [recipe, setRecipe]=React.useState();
  const [ingredients, setIngredients] = React.useState([]);
  const [newIngredient, setNewIngredient] = React.useState('');
  const [error, setError]= React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState();
  const navigate = useNavigate();
  var userData = localStorage.getItem('user');
  var user = JSON.parse(userData);

  const location = useLocation();
  const recipeId = location.state;
  
   

    React.useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`https://foodie-app-uz37.onrender.com/recipe/${recipeId}`)
            const data = await response.json()
    
            if (response.ok) {
                setRecipe(data)
                setIngredients(data.ingredients)
                setSelectedCategory(data.category)
                
            }
        };
        fetchRecipe();          
      },[recipeId]);



  const addIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient('');
    }
  };

  const categoryList = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Dessert", label: "Dessert" }
];
function handleSelect(data) {
  setSelectedCategory(data.value);
  console.log(selectedCategory)
}
  
const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://foodie-app-uz37.onrender.com/recipe/${recipeId}`, {
        method: 'PATCH', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        console.log('Recipe updated successfully');
        window.location.replace('/profile');
        // Handle success, e.g., redirect or show a success message
      } else {
        console.error('Failed to update recipe:', response.statusText);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };


    return (
        
        <div className="addrecipe">
            {recipe &&
            <div>
          <div className="r-name">
              <input  onChange={handleChange} name="name" type="text"  defaultValue={recipe.name} class="form-control" id="recipeName-input" />
            </div>

            <div className="container2">
            <div className="r-duration">
              <div>Duration:</div>
              <input onChange={handleChange}  name="duration" type="text" defaultValue={recipe.duration} class="form-control" id="duration-input" required=""/>
            </div>
            <Select
                    options={categoryList}
                    placeholder={selectedCategory}
                    value={selectedCategory}
                    onChange={handleSelect}
                    isSearchable={true}
                    className="r-select"
                   
                />
            </div>
            
            <div className="r-directions">
              <label class="form-label">Directions</label>
              <textarea onChange={handleChange} defaultValue={recipe.directions} name="directions"  cols="30" rows="20" id="directions-input" required=""/>
            </div>


            <div className="r-ingredients">
            <label for="ingredients" class="form-label">Ingredients</label>
            <div>
                <input
              type="text"
              name="ingredients"
              value={newIngredient}
              onChange={handleChange}
              placeholder="Enter an ingredient"
              id="ingredients-input"
            />
            <button className="add-ingredient-button" onClick={addIngredient}>Add Ingredient</button>
            </div>

            <ul className="er-ingredients">
            {ingredients[0].split(',').map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
            </div>
            

            <div className="r-button"><button onClick={handleUpdate}>Update</button></div>
            {error && <div className="r-error">All fields must be filled.</div>}
            </div>
        }
        </div>
    )
}
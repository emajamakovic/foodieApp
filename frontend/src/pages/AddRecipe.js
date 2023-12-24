import React from "react";
import '../styles/AddRecipe.css'
import Select from "react-select";
import { useNavigate } from 'react-router-dom';


export default function AddRecipe() {

  const [recipeName, setRecipeName]=React.useState();
  const [ingredients, setIngredients] = React.useState([]);
  const [newIngredient, setNewIngredient] = React.useState('');
  const [directions, setDirections]=React.useState();
  const [duration, setDuration]=React.useState();
  const [image, setImage]=React.useState();
  const [error, setError]= React.useState(false);
  const navigate = useNavigate();
  var userData = localStorage.getItem('user');
  var user = JSON.parse(userData);
  const numerOfLikes=0;
  
   

    React.useEffect(() => {
        // Redirect to login page if user is null
        if (!user) {
          navigate('/login');
        }
      }, [user, navigate]);


  const addIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient('');
    }
  };

  const [selectedCategory, setSelectedCategory] = React.useState();

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
  


  const createRecipe = async () => {
    if (!recipeName || !ingredients || !directions || !duration || !image || !selectedCategory) {
      setError(true);
      // You might want to display an error message to the user here
      return false;
    }

    const url = 'http://localhost:3000/recipe/';
  
    const formData = new FormData();
    formData.append('name', recipeName);
    formData.append('ingredients', ingredients);
    formData.append('directions', directions);
    formData.append('duration', duration);
    formData.append('postedBy', user.email);
    formData.append('image', image);
    formData.append('category', selectedCategory);
    formData.append('likes', numerOfLikes);

  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const recipe = await response.json();
        console.log('Recipe created:', recipe);
        window.location.href='http://localhost:3001/';
      } else {
        const error = await response.json();
        console.error('Failed to create recipe:', error);
      }
    } catch (error) {
      console.error('Failed to create recipe:', error);
      window.location.href='http://localhost:3001/';

    }
  };


    return (
        <div className="addrecipe">

          <div className="r-name">
              <input  onChange={(e)=>setRecipeName(e.target.value)} type="text" placeholder="Recipe name" class="form-control" id="recipeName-input" required=""/>
            </div>

            <div className="container2">
            <div className="r-duration">
              <div>Duration:</div>
              <input onChange={(e)=>setDuration(e.target.value)}  type="text" placeholder="1:30" class="form-control" id="duration-input" required=""/>
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
              <textarea onChange={(e)=>setDirections(e.target.value)} name="fixed-size-textarea"  cols="30" rows="20" id="directions-input" required=""/>
            </div>


            <div className="r-ingredients">
            <label for="ingredients" class="form-label">Ingredients</label>
            <div>
                <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Enter an ingredient"
              id="ingredients-input"
            />
            <button className="add-ingredient-button" onClick={addIngredient}>Add Ingredient</button>
            </div>

            <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
            </div>
            

            <div className="r-image">
              <label>Image</label>
              <input type="file" accept="image/*" name="image" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            

            <div className="r-button"><button onClick={createRecipe}>Create</button></div>
            {error && <div className="r-error">All fields must be filled.</div>}
        </div>
    )
}
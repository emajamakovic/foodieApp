import React from "react";

export default function AddRecipe() {

  const [recipeName, setRecipeName]=React.useState();
  const [ingredients, setIngredients]=React.useState();
  const [directions, setDirections]=React.useState();
  const [duration, setDuration]=React.useState();


  const createRecipe = async () => {
    const url ='http://localhost:3000/recipe/'; 
  
    const addData = {
        name: recipeName,
        ingredients:ingredients,
        directions:directions,
        duration:duration,
        postedBy:"ema"   ///after you done login change this 
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addData),
      });
  
      if (response.ok) {
        const recipe = await response.json();
        console.log('Recipe created:', recipe);
      } else {
        const error = await response.json();
        console.error('Failed to create recipe:', error);
      }
    } catch (error) {
      console.error('Failed to create recipe:', error);
    }
  };


    return (
        <div>
          <div>
              <label for="recipeName" class="form-label">Recipe name</label>
              <input onChange={(e)=>setRecipeName(e.target.value)} type="text" class="form-control" id="recipeName" required=""/>
            </div>
            <div>
              <label for="ingredients" class="form-label">Ingredients</label>
              <input onChange={(e)=>setIngredients(e.target.value)}  type="text" class="form-control" id="ingredients" required=""/>
            </div>
            <div>
              <label for="directions" class="form-label">Directions</label>
              <input onChange={(e)=>setDirections(e.target.value)}  type="text" class="form-control" id="directions" required=""/>
            </div>
            <div>
              <label for="duration" class="form-label">Duration</label>
              <input onChange={(e)=>setDuration(e.target.value)}  type="text" class="form-control" id="duration" required=""/>
            </div>

            <div><button onClick={createRecipe}>Submit</button></div>
        </div>
    )
}
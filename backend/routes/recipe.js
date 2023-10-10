const express = require('express')
const {
    getRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe
} = require('../controllers/recipeController')

const router = express.Router()

// GET all Recipes
router.get('/', getRecipes) 


// GET a single Recipe by id
router.get('/:id', getRecipe) 

// POST a new Recipe
router.post('/', createRecipe)

// DELETE a Recipe
router.delete('/:id', deleteRecipe) 

// UPDATE a Recipe
router.patch('/:id', updateRecipe) 

module.exports = router
const express = require('express')
const {
    getRecipes,
    getRecipe,
    getByLikes,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    getUserPosts
} = require('../controllers/recipeController')

const router = express.Router()

// GET all Recipes
router.get('/', getRecipes) 

//most likes
router.get('/likes/', getByLikes)

// GET a single Recipe by id
router.get('/:id', getRecipe) 

//Get
router.get('/user/:user', getUserPosts)

// POST a new Recipe
router.post('/', createRecipe)

// DELETE a Recipe
router.delete('/:id', deleteRecipe) 

// UPDATE a Recipe
router.patch('/:id', updateRecipe) 

module.exports = router
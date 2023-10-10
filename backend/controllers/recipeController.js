const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')

// get all Recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipe.find({})

  res.status(200).json(recipes)
}
// get a single Recipe by id 
const getRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Recipe'})
  }

  const recipe = await Recipe.findById(id)

  if (!recipe) {
    return res.status(404).json({error: 'No such Recipe'})
  }

  res.status(200).json(recipe)
}

// create a new Recipe
const createRecipe = async (req, res) => {
  const {name, ingredients, directions, postedBy, duration} = req.body
  
  try {
    const recipe = await Recipe.create({name, ingredients, directions, postedBy, duration})
    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a Recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findOneAndDelete({_id: id})

  if(!recipe) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(recipe)
}

// update a Recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!recipe) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(recipe)
}

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe
}
const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')
const multer = require('multer')

const Storage = multer.diskStorage({
  destination: "../frontend/src/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage
}).single('image');

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

const getByLikes = async (req, res) => {
  try {
    console.log('Request received for /recipe/likes/');

    const recipes = await Recipe.find({}).sort({ likes: -1 }).limit(1);

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// get a  Recipes by email
const getUserPosts = async (req, res) => {
  const { user } = req.params

  const recipe = await Recipe.find({ postedBy : user})

  if (!recipe) {
    return res.status(404).json({error: 'No'})
  }

  res.status(200).json(recipe)
}


const createRecipe = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
    } else {
      const recipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        postedBy: req.body.postedBy,
        duration: req.body.duration,
        category: req.body.category,
        likes:req.body.likes,
        image: {
          data: req.file.filename,
          contentType: 'image/png',
          name: req.file.filename
        }

      })
      recipe.save().then(() => res.send('uploaded'))
    }
  })
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
  getByLikes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getUserPosts
}
const Restaurant = require('../models/restaurantModel')
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

// get all Restaurants
const getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find({})

  res.status(200).json(restaurants)
}

// get a single Restaurant by id 
const getRestaurant = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Restaurant'})
  }

  const restaurant = await Restaurant.findById(id)

  if (!restaurant) {
    return res.status(404).json({error: 'No such Restaurant'})
  }

  res.status(200).json(restaurant)
}


// get a restaurants by email
const getUserRestaurants = async (req, res) => {
  const { user } = req.params

  const restaurant = await Restaurant.find({ postedBy : user})

  if (!restaurant) {
    return res.status(404).json({error: 'No'})
  }

  res.status(200).json(restaurant)
}

//create a restaurant

const createRestaurant = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
    } else {
      const restaurant = new Restaurant({
        name: req.body.name,
        priceRange: req.body.priceRange,
        cuisines: req.body.cuisines,
        postedBy: req.body.postedBy,
        email: req.body.email,
        number: req.body.number,
        workingTime: req.body.workingTime,
        address: req.body.address,
        likes:req.body.likes,
        image: {
          data: req.file.filename,
          contentType: 'image/png',
          name: req.file.filename
        }

      })
      restaurant.save().then(() => res.send('uploaded'))
    }
  })
}

// delete a Restaurant
const deleteRestaurant = async (req, res) => {
    const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such recipe'})
  }

  const restaurant = await Restaurant.findOneAndDelete({_id: id})

  if(!restaurant) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(restaurant)
}

// update a Recipe
const updateRestaurant = async (req, res) => {
    const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such recipe'})
  }

  const restaurant = await Restaurant.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!restaurant) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(restaurant)
}

module.exports = {
  getRestaurants,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
  getUserRestaurants,
  getRestaurant
}
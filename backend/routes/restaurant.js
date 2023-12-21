const express = require('express')
const {
    getRestaurants,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant,
    getUserRestaurants,
    getRestaurant
} = require('../controllers/restaurantController')

const router = express.Router()

// GET all Restaurant
router.get('/', getRestaurants) 

//GET by id 
router.get('/:id', getRestaurant) 


router.get('/user/:user', getUserRestaurants)

// POST a new Restaurant
router.post('/', createRestaurant)

// DELETE a Restaurant
router.delete('/:id', deleteRestaurant) 

// UPDATE a Restaurant
router.patch('/:id', updateRestaurant) 

module.exports = router
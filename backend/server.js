require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const recipeRoutes = require('./routes/recipe')
const userRoutes = require('./routes/user')
const restaurantRoutes = require('./routes/restaurant')



// express app
const app = express()

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://foodie-emajamakovic.netlify.app'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// middleware
app.use(express.json());


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/recipe', recipeRoutes)
app.use('/user', userRoutes)
app.use('/restaurant', restaurantRoutes)



// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
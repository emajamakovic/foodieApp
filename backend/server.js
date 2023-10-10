require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const recipeRoutes = require('./routes/recipe')

// express app
const app = express()

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Replace with your client-side origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
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
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    const name=user.name;
    // create a token
    const token = createToken(user._id)

    res.status(200).json({email,name })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
    const {email, password, name} = req.body

  try {
    const user = await User.signup(email, password, name)

     // create a token
     const token = createToken(user._id)


    res.status(200).json({email, name})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
 
}

const getUserByEmail = async (req, res) => {
  const { email } = req.params

  const user = await User.findOne({ email : email })
    console.log('User:', user);

  if (!user) {
    return res.status(404).json({ error: 'No user found' });
  }

  res.status(200).json(user)
}

module.exports = { signupUser, loginUser, getUserByEmail }
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')



const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})


// static signup method
userSchema.statics.signup = async function(email, password, name) {

  // validation
  if (!email || !password || !name) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('The format of the email address is not correct')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password needs to be 8 characters long. It should include both lower and upper case letters, and include at least one number and symbol.')
  }

    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ email, password: hash, name })
  
    return user
  }

  
// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}
  

module.exports = mongoose.model('User', userSchema)
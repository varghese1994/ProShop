const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')


//@desc auth user and get token
//@route POST /api/users/login
//@access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//@desc register new user
//@route POST /api/users
//@access public

const userRegister = asyncHandler( async(req,res) =>{
  const {name,email,password,isAdmin} = req.body

  const existUser = await User.findOne({email})
  if(existUser){
    res.status(400)
    throw new Error('User already exist!')
  }
  const user = await User.create({
    name,
    email,
    password,
    isAdmin
  })
  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('Invalid user data!');
  }
})

//@desc get user profile
//@route GET /api/users/profile
//@access private

const getUserProfile = asyncHandler( async(req,res) =>{
  const user = await User.findById(req.user._id)
  if(user){
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmim: user.isAdmin
      })
  }else{
    res.status(404)
    throw new Error('User not found!')
  }
})

//@desc update user profile
//@route PUT /api/users/profile
//@access private

const updatedUserProfile = asyncHandler( async(req,res) =>{
  const user = await User.findById(req.user._id)
    if(user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if(req.body.password){
        user.password = req.body.password
      }
      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmim: updatedUser.isAdmin,
        token: generateToken(updatedUser._id)
      })
      
  }else{
    res.status(404)
    throw new Error('User not found!')
  }
})

//@desc get user profile
//@route GET /api/users/profile
//@access private

const getUsers = asyncHandler( async(req,res) =>{
  const users = await User.find({})
  if(users){
    res.json(users)  
  }else{
    res.status(404)
    throw new Error('User not found!')
  }
})

//@desc delete user admin only
//@route DELETE /api/users/:id
//@access private/admin

const deleteUser = asyncHandler( async(req,res) =>{
  const user = await User.findById(req.params.id)
  if(user){
    await user.remove()
    res.json({message:'user removed!'})  
  }else{
    res.status(404)
    throw new Error('User not found!')
  }
})

//@desc get user by Id only an admin
//@route GET /api/users/:id
//@access private/admin

const getUserById = asyncHandler( async(req,res) =>{
  const user = await User.findById(req.params.id)
  if(user){
    res.json(user)  
  }else{
    res.status(404)
    throw new Error('User not found!')
  }
})

//@desc update user by admin
//@route PUT /api/users/:id
//@access private/admin

const updateUser = asyncHandler( async(req,res) =>{
  const user = await User.findById(req.params.id)
    if(user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin 
      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmim: updatedUser.isAdmin,
      })
      
  }else{
    res.status(404)
    throw new Error('User not found!')
  }
})


module.exports ={
    userRegister,
    authUser,
    getUserProfile,
    updatedUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}
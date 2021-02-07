const express = require('express')
const {authUser,getUserProfile,userRegister,updatedUserProfile,getUsers,deleteUser,getUserById,updateUser} = require('../controllers/userController') 
const {protect,admin} = require('../middleware/authMiddleware')


const router = express.Router()

router.route('/').post(userRegister).get(protect,admin,getUsers)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updatedUserProfile)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)


module.exports = router

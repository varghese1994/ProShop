const express = require('express')
const {protect,admin} = require('../middleware/authMiddleware')
const {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrdersByAdmin,updateOrderToDelivered} = require('../controllers/orderController')


const router = express.Router()

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrdersByAdmin)
router.route('/myorders').get(protect,getMyOrders)

router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)



module.exports = router
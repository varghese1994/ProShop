const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const User = require('../models/userModel')


//@desc Create order
//@route POST /api/orders
//@access private

const addOrderItems = asyncHandler( async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
    }
    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    })
    await order.save()
    res.status(201).json({order})

})

//@desc get order by id
//@route GET /api/orders/:id
//@access private

const getOrderById = asyncHandler(async(req,res) =>{
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('order not found!')
    }
})

//@desc update order to paid
//@route GET /api/orders/:id/pay
//@access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })

//@desc GET logged in user orders
//@route GET /api/orders/myorders
//@access private

const getMyOrders = asyncHandler(async (req, res) => {
    
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
  })

//@desc GET orders by admin only
//@route GET /api/orders
//@access private

const getOrdersByAdmin = asyncHandler(async (req, res) => {
    
    const orders = await Order.find({}).populate('user','id name')
    res.json(orders)
  })

//@desc update order to paid
//@route GET /api/orders/:id/pay
//@access private

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })


module.exports={
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrdersByAdmin,
    updateOrderToDelivered
}
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const users = require('./data/users')
const products = require('./data/products')

const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')

const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () =>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product =>{
            return{...product,user: adminUser}
        })
        await Product.insertMany(sampleProducts)
        console.log('Data imported!')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const destroyData = async () =>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

    
        console.log('Data destroyed!')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}
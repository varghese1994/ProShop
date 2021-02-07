const express = require('express')
const products = require('./data/products')
const dotenv = require('dotenv')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')
const connectDB =require('./config/db')
const path = require('path')
const cors = require('cors');
const morgan = require('morgan')

const app = express()

dotenv.config()

app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(cors())
//DB connect
connectDB()

//routes
app.use('/api/products',require('./routes/productRouter'))
app.use('/api/users',require('./routes/userRouter'))
app.use('/api/orders',require('./routes/orderRouter'))
app.use('/api/upload',require('./routes/uploadRoutes'))

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

__dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server running on port ${PORT}`))
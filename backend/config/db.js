const mongoose = require('mongoose')

const connectDB = async () =>{
   try {
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify:true
        })
        console.log(`MongoDB connected: ${connect.connection.host}`)
   } catch (error) {
       console.log(`Error: ${error.message}`)
       process.exit(1)
   }
}
module.exports = connectDB
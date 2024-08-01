//importing mongoose
const mongoose = require('mongoose')

//importing colors
const colors = require('colors')

//creating a function for connecting database
const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`server running on ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
}

// exprting the function
module.exports = connectDb;
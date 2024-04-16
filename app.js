const connectDB =require("./db/connect")
const express = require('express')
const tasks = require("./routes/tasks")
require('dotenv').config()

const app= express()
const PORT = process.env.PORT


//serve Static Files
app.use(express.static("./public"))
//json middleware
app.use(express.json())

 

//routes middleware
app.use("/api/v1/tasks",tasks)



const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is Listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}


start()

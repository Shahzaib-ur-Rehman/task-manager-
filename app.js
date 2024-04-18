const connectDB =require("./db/connect")
const express = require('express')
const tasks = require("./routes/tasks")
require('dotenv').config()
const notFound = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const app= express()
const PORT = process.env.PORT || 3000


//serve Static Files
app.use(express.static("./public"))
//json middleware
app.use(express.json())

 

//routes middleware
app.use("/api/v1/tasks",tasks)

//not found redirect
app.use(notFound)

//error handler middleware

app.use(errorHandlerMiddleware);


const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is Listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}


start()

const express = require("express")
const {getAllTasks,deleteTask,getTask,updateTask,createTask} = require('../controllers/tasks')

const router = express.Router()



//task route
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)








module.exports = router
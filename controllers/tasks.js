const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async");
const {createCustomErrors} = require("../errors/custom-error")
//@METHOD GET
// GET ALL TASKS
const getAllTasks = asyncWrapper( async (req, res) => {
  const tasks = await Task.find({});
    res.status(200).json({
      success: true,
      message: "All Tasks",
      tasks
    });
})

//@METHOD POST
//CREATE TASK
const createTask = asyncWrapper(
  async (req, res) => {
    const task = await Task.create(req.body);
      res.status(201).json({
        success: true,
        message: "Task Created!",
        task
      });
  }
)

//@METHOD GET
//GET SINGLE TASK
const getTask = asyncWrapper(
  async (req, res, next) => {
    const { id: taskID } = req.params;
      const task = await Task.findOne({ _id: taskID });
      if (!task) {
        return next(createCustomErrors(`Task Not Found With ID ${taskID}`,404))
         
      }
      res.status(200).json({
        success: true,
        message: "Task Details",
        task
      });
  }
)

//@METHOD DELETE
//DELETE A TASK
const deleteTask = asyncWrapper(
  async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return next(createCustomErrors(`Task Not Found With ID ${taskID}`,404))
    }
    res.status(200).json({
      success: true,
      message: "Task Deleted!",
      task
    });
  }
)

//@METHOD PATCH
//UPDATE TASK
const updateTask = asyncWrapper((async (req, res,next) => {
  const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(createCustomErrors(`Task Not Found With ID ${taskID}`,404))
    }
    res.status(200).json({
      success: true,
      message: "Task Updated!",
      task
    });
}))

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

const Task = require("../models/Task");

//@METHOD GET
// GET ALL TASKS
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({
      success: true,
      message: "All Tasks",
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

//@METHOD POST
//CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      message: "Task Created!",
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

//@ METHOD GET
//GET SINGLE TASK
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task Not Found With ID ${taskID}`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Task Details",
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

//@METHOD DELETE
//DELETE A TASK
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(400).json({
        success: false,
        message: `Not Found With ID ${taskID}`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Task Deleted!",
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

//@METHOD PATCH
//UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Not Found With ID ${taskID}`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Task Updated!",
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

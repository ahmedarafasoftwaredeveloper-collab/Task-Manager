const taskModel = require("../models/task.model");
const httpStatus = require("../utils/http.status");
const expressAsyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const getAllTasks = expressAsyncHandler(async (req, res) => {
  const tasks = await taskModel.find({}, { __v: false });

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { tasks },
  });
});

const getTask = expressAsyncHandler(async (req, res) => {
  const taskId = req.params.taskId;
  const task = await taskModel.findById(taskId);

  if (!task) {
    return res.status(404).json({
      status: httpStatus.ERROR,
      msg: "Task Not Found",
    });
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { task },
  });
});

const addTask = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: httpStatus.ERROR,
      errors: errors.array(),
    });
  }

  const { name, completed } = req.body;
  const newTask = new taskModel({
    name,
    completed,
  });
  await newTask.save();
  return res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { newTask },
  });
});

const updateTask = expressAsyncHandler(async (req, res) => {
  const taskId = req.params.taskId;
  const newTask = await taskModel.findByIdAndUpdate(taskId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!newTask) {
    return res.status(404).json({
      status: httpStatus.ERROR,
      msg: "Task Not Found",
    });
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { newTask },
  });
});

const deleteTask = expressAsyncHandler(async (req, res) => {
  const taskId = req.params.taskId;
  const deletedTask = await taskModel.findByIdAndDelete(taskId);

  if (!deletedTask) {
    return res.status(404).json({
      status: httpStatus.ERROR,
      msg: "Task Not Found",
    });
  }

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    msg: "Task deleted successfully",
  });
});

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};

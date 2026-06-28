const Task = require('../models/Task');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all tasks belonging to the logged-in user
// @route   GET /api/tasks
// @access  Protected
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// @desc    Get a single task by ID (only if it belongs to the logged-in user)
// @route   GET /api/tasks/:id
// @access  Protected
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Create a new task (auto-assigns the logged-in user ID)
// @route   POST /api/tasks
// @access  Protected
const createTask = asyncHandler(async (req, res) => {
  const taskData = {
    ...req.body,
    user: req.user._id,
  };
  
  const task = await Task.create(taskData);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});

// @desc    Update a task by ID (only if it belongs to the logged-in user)
// @route   PUT /api/tasks/:id
// @access  Protected
const updateTask = asyncHandler(async (req, res) => {
  // Ensure task exists and belongs to the user before updating
  let task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});

// @desc    Delete a task by ID (only if it belongs to the logged-in user)
// @route   DELETE /api/tasks/:id
// @access  Protected
const deleteTask = asyncHandler(async (req, res) => {
  // Ensure task exists and belongs to the user before deleting
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
});

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
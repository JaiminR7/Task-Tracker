const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all task endpoints
router.use(protect);

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
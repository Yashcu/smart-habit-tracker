const express = require('express');
const router = express.Router();
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes below require authentication

router.route('/')
  .get(getHabits)
  .post(createHabit);

router.route('/:id')
  .put(updateHabit)
  .delete(deleteHabit);

module.exports = router;

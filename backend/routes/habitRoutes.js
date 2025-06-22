const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  checkInHabit,
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// Validation middleware
const habitValidation = [
  body('title').isString().isLength({ min: 2 }).withMessage('Title is required and must be at least 2 characters.'),
  body('frequency').optional().isIn(['daily', 'weekly']).withMessage('Frequency must be daily or weekly.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.route('/')
  .get(getHabits)
  .post(habitValidation, createHabit);

router.route('/:id')
  .put(habitValidation, updateHabit)
  .delete(deleteHabit);

router.post('/:id/checkin', checkInHabit);

module.exports = router;

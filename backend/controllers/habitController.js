/**
 * Habit Controller
 * Handles CRUD and check-in logic for habits
 */
const moment = require('moment');
const Habit = require('../models/Habit');
const logger = require('../config/logger');

/**
 * Get all habits for the logged-in user
 */
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });
    res.json(habits);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create a new habit
 */
exports.createHabit = async (req, res) => {
  try {
    const { title, frequency } = req.body;
    const habit = await Habit.create({
      user: req.user._id,
      title,
      frequency,
    });
    res.status(201).json(habit);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update a habit
 */
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    const updated = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete a habit
 */
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Check in a habit (mark as completed for today)
 */
exports.checkInHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const now = moment().startOf('day');
    const last = habit.lastCompleted ? moment(habit.lastCompleted).startOf('day') : null;

    if (last && now.isSame(last)) {
      return res.status(400).json({ message: 'Already checked in today' });
    }

    if (last && now.diff(last, 'days') === 1) {
      habit.currentStreak += 1;
    } else {
      habit.currentStreak = 1;
    }

    habit.lastCompleted = now.toDate();
    habit.history.push({ date: now.toDate(), streakAtTime: habit.currentStreak });
    await habit.save();

    res.json(habit);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

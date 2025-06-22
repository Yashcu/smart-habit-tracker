/**
 * Auth Controller
 * Handles user registration and login
 */
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const logger = require('../config/logger');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

/**
 * Register a new user
 */
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const user = await User.create({ name, email, password });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Login a user
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.checkInHabit = async (req, res) => {
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
    await habit.save();
  
    res.json(habit);
  };

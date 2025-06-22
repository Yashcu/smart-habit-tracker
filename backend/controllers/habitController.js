const Habit = require('../models/Habit');

// GET all habits for logged-in user
exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
};

// CREATE a new habit
exports.createHabit = async (req, res) => {
  const { title, frequency } = req.body;
  const habit = await Habit.create({
    user: req.user._id,
    title,
    frequency,
  });
  res.status(201).json(habit);
};

// UPDATE a habit
exports.updateHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit || habit.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Habit not found' });
  }
  const updated = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE a habit
exports.deleteHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit || habit.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Habit not found' });
  }
  await habit.remove();
  res.json({ message: 'Habit deleted' });
};

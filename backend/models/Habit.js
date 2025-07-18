const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
  currentStreak: { type: Number, default: 0 },
  lastCompleted: { type: Date },
  history: [
    {
      date: { type: Date },
      streakAtTime: { type: Number, default: 1 },
    },
  ],  
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);

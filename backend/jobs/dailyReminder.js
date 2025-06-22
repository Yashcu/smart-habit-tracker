const cron = require('node-cron');
const User = require('../models/User');
const Habit = require('../models/Habit');
const sendReminderEmail = require('../utils/mailer');
const logger = require('../config/logger');

cron.schedule('0 8 * * *', async () => {
  logger.info('Sending daily habit reminder emails...');
  const users = await User.find();

  for (const user of users) {
    const habits = await Habit.find({ user: user._id });
    if (habits.length > 0) {
      await sendReminderEmail(user.email, habits);
    }
  }
});

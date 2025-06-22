const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = (to, habits) => {
  const habitList = habits.map(h => `• ${h.title}`).join('<br>');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '⏰ Don’t forget to track your habits!',
    html: `<p>Here's your habit list for today:</p><p>${habitList}</p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendReminderEmail;

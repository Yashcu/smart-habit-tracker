const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/dg.js');
const logger = require('./config/logger');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

require('./jobs/dailyReminder');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/habits', require('./routes/habitRoutes'));

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Smart Habit Tracker API',
    version: '1.0.0',
    description: 'API documentation for Smart Habit Tracker',
  },
  paths: {},
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req,res) => res.send('API is running...'));

// Centralized error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
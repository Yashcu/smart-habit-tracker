const express = require('express');
const dotenv = require('dotenv');
const moongoose = require('mongoose');
const cors = require('cors');
const e = require('express');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => res.send('API is running...'));

moongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
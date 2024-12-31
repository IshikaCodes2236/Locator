
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/location')
const dotenv = require('dotenv');

const cors = require('cors');
const authMiddleware = require('./middlewares/auth')



dotenv.config();

const app = express();
const corsOptions = {
  origin: ['https://locator-4sjp-ishikacodes2236s-projects.vercel.app/','https://locator-4sjp-git-main-ishikacodes2236s-projects.vercel.app/', 'https://locator-4sjp.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.json()); // for parsing application/json

// If you are using express >= 4.16.0, you can use the built-in express.json() instead:
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/locations', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});


app.use('/api/auth', authRoutes);
app.use('/api/location', authMiddleware, locationRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

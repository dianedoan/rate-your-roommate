const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createTables } = require('./config/createTables');
const authRoutes = require('./Routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Initialize DynamoDB tables
//createTables().catch(console.error);

app.get('/test', (req, res) => {
    res.json({ message: 'Backend is running!' });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
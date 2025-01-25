const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const recipientRoutes = require('./routes/recipientRoutes');
const logRoutes = require('./routes/logRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipients', recipientRoutes);
app.use('/api/logs', logRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

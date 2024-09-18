const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the CORS package
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path');

// Initialize Express
const app = express();
dotenv.config();

// Connect to the database
connectDB();

// Enable CORS for your front-end URL
const corsOptions = {
    origin: 'https://tourez.onrender.com', // Allow this specific front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // If you want to include cookies in the requests
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Define your routes
app.get('/', (req, res) => {
    res.send("API is running....");
});

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path');


const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// middleware
app.get('/', (req, res) => {
    res.send("API is running....");
})

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is listening on port ...${PORT}`);
});

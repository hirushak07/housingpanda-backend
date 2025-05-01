import express from 'express';
import listingsRouter from './routes/listings.js';

const app = express();
const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the /listings routes
app.use('/listings', listingsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createTables } = require('./config/createTables');
const authRoutes = require('./Routes/authRoutes');
const { handler } = require('./lambda/handler');

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : 'http://localhost:3000',
    credentials: true,
}));

app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Middleware to convert Express requests to Lambda format
const lambdaWrapper = (fn) => async (req, res) => {
    try {
        // Convert Express request to Lambda event format
        const event = {
            httpMethod: req.method,
            path: req.path.replace('/api/auth', ''),
            body: JSON.stringify(req.body),
            headers: req.headers,
        };

        // Call Lambda handler
        const result = await fn(event);

        // Send Lambda response back through Express
        res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
        console.error('Lambda wrapper error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Routes - wrap Lambda handler for local development
if (process.env.NODE_ENV === 'development') {
    app.post('/api/auth/login', lambdaWrapper(handler));
    app.post('/api/auth/register', lambdaWrapper(handler));
} else {
    app.use('/api/auth', authRoutes);
}

// Test route
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Backend is running!',
        environment: process.env.NODE_ENV
    });
});

// Initialize DynamoDB tables in development
if (process.env.NODE_ENV === 'development') {
    createTables().catch(console.error);
}

// Start server only if not in Lambda environment
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
}

// Export handler for Lambda
exports.handler = handler;


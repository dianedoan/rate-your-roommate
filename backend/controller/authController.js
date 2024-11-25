const { DynamoDBDocumentClient, QueryCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
//const { docClient } = require('../config/dynamoDB');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Query user by email using GSI
        const params = new QueryCommand({
            TableName: 'Users',
            IndexName: 'EmailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        });

        const result = await docClient.send(params);
        const user = result.Items[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const register = async (req, res) => {
    try {
        const { email, password, username, firstName, lastName } = req.body;

        // Check if email already exists
        const emailParams = new QueryCommand({
            TableName: 'Users',
            IndexName: 'EmailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        });

        const emailResult = await docClient.send(emailParams);
        if (emailResult.Items.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const userId = uuidv4();
        const newUser = {
            id: userId,
            email,
            username,
            password: hashedPassword,
            firstName,
            lastName,
            createdAt: new Date().toISOString()
        };

        await docClient.send(new PutCommand({
            TableName: 'Users',
            Item: newUser
        }));

        // Generate JWT token
        const token = jwt.sign(
            { userId, email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: userId,
                email,
                username,
                firstName,
                lastName
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login, register };
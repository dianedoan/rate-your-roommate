const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../config/dynamodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Lambda handler
exports.handler = async (event) => {
    try {
        // Parse HTTP method and path
        const { httpMethod, path, body } = event;
        const parsedBody = JSON.parse(body);

        // Route requests
        switch (`${httpMethod} ${path}`) {
            case 'POST /login':
                return await login(parsedBody, docClient);
            case 'POST /register':
                return await register(parsedBody, docClient);
            default:
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Not Found' })
                };
        }
    } catch (error) {
        console.error('Handler error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error' })
        };
    }
};

// Login function
const login = async (body) => {
    try {
        const { email, password } = body;

        const params = {
            TableName: 'Users',
            IndexName: 'EmailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        };

        const result = await docClient.send(new QueryCommand(params));
        const user = result.Items[0];

        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid credentials' })
            };
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid credentials' })
            };
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error' })
        };
    }
};

// Register function
const register = async (body) => {
    try {
        const { email, password, username, firstName, lastName } = body;

        // Check if email exists
        const emailResult = await docClient.send(new QueryCommand({
            TableName: 'Users',
            IndexName: 'EmailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        }));

        if (emailResult.Items.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Email already exists' })
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
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

        const token = jwt.sign(
            { userId, email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            statusCode: 201,
            body: JSON.stringify({
                token,
                user: {
                    id: userId,
                    email,
                    username,
                    firstName,
                    lastName
                }
            })
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error' })
        };
    }
};
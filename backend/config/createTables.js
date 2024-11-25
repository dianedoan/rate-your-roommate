const { CreateTableCommand } = require('@aws-sdk/client-dynamodb');
//const { docClient } = require('./dynamoDB'); 

const createTables = async () => {
    // Users Table - Combines Users and Profiles for single-table design
    const UsersTable = {
        TableName: 'Users',
        KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
            { AttributeName: 'email', AttributeType: 'S' },
            { AttributeName: 'username', AttributeType: 'S' },
            { AttributeName: 'city', AttributeType: 'S' }
        ],
        GlobalSecondaryIndexes: [
            {
                IndexName: 'EmailIndex',
                KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
                Projection: { ProjectionType: 'ALL' },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            },
            {
                IndexName: 'UsernameIndex',
                KeySchema: [{ AttributeName: 'username', KeyType: 'HASH' }],
                Projection: { ProjectionType: 'ALL' },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            },
            {
                IndexName: 'CityIndex',
                KeySchema: [{ AttributeName: 'city', KeyType: 'HASH' }],
                Projection: { ProjectionType: 'ALL' },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    // Reviews Table
    const ReviewsTable = {
        TableName: 'Reviews',
        KeySchema: [
            { AttributeName: 'reviewId', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'reviewId', AttributeType: 'S' },
            { AttributeName: 'userId', AttributeType: 'S' },
            { AttributeName: 'date', AttributeType: 'S' }
        ],
        GlobalSecondaryIndexes: [
            {
                IndexName: 'UserReviewsIndex',
                KeySchema: [
                    { AttributeName: 'userId', KeyType: 'HASH' },
                    { AttributeName: 'date', KeyType: 'RANGE' }
                ],
                Projection: { ProjectionType: 'ALL' },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    // Messages Table
    const MessagesTable = {
        TableName: 'Messages',
        KeySchema: [
            { AttributeName: 'conversationId', KeyType: 'HASH' },
            { AttributeName: 'timestamp', KeyType: 'RANGE' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'conversationId', AttributeType: 'S' },
            { AttributeName: 'timestamp', AttributeType: 'N' },
            { AttributeName: 'userId', AttributeType: 'S' }
        ],
        GlobalSecondaryIndexes: [
            {
                IndexName: 'UserMessagesIndex',
                KeySchema: [
                    { AttributeName: 'userId', KeyType: 'HASH' },
                    { AttributeName: 'timestamp', KeyType: 'RANGE' }
                ],
                Projection: { ProjectionType: 'ALL' },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    // SavedProfiles Table
    const SavedProfilesTable = {
        TableName: 'SavedProfiles',
        KeySchema: [
            { AttributeName: 'userId', KeyType: 'HASH' },
            { AttributeName: 'savedUserId', KeyType: 'RANGE' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'userId', AttributeType: 'S' },
            { AttributeName: 'savedUserId', AttributeType: 'S' }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    // Create tables
    const tables = [UsersTable, ReviewsTable, MessagesTable, SavedProfilesTable];
    
    for (const table of tables) {
        try {
            await docClient.send(new CreateTableCommand(table));
            console.log(`Created table: ${table.TableName}`);
        } catch (error) {
            if (error.name === 'ResourceInUseException') {
                console.log(`Table ${table.TableName} already exists`);
            } else {
                console.error(`Error creating table ${table.TableName}:`, error);
            }
        }
    }
};

module.exports = { createTables };
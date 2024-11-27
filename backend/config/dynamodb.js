const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const createDynamoDBClient = () => {
    // When running in Lambda, use default credentials
    if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
        return new DynamoDBClient({});
    }

    // When running locally, use credentials from .env
    return new DynamoDBClient({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });
};

const client = createDynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

module.exports = { docClient };
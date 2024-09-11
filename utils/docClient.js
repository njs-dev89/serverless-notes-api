const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
} = require("@aws-sdk/lib-dynamodb");

exports.NOTES_TABLE = process.env.NOTES_TABLE;

const client = new DynamoDBClient({region: 'us-east-1'});

exports.docClient = DynamoDBDocumentClient.from(client);

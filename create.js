import uuid from "uuid";
import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import {success, failure} from "./libs/response-lib";

const dynamoDb = new AWS.DynamoDB.DocumentClient();


export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "notes",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch(err) {
        return failure({status: false});
    }
}
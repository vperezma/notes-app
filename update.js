import * as DynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'notes',
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ":attachment": data.attachement || null,
            ":content": data.content || null
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await DynamoDbLib.call('update', params);
        return success({status: true});
    } catch(e) {
        return failure({status: false});
    }
}
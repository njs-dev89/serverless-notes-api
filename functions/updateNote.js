const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient, NOTES_TABLE } = require("../utils/docClient");
exports.handler = async (event, context) =>{
	const data = JSON.parse(event.body)
	const id = event.pathParameters.id
	const params = {
		TableName: NOTES_TABLE,
		Key: {
			noteId: id
		},
		UpdateExpression: "set #title = :title, #body = :body",
		ExpressionAttributeNames: {
			"#title": "title",
			"#body": "body"
		},
		ExpressionAttributeValues: {
			":title": data.title,
			":body": data.body
		},
		ConditionExpression: 'attribute_exists(noteId)'
	  };
	  const command = new UpdateCommand(params)
	try {
		await docClient.send(command)
		return {
			statusCode: 200,
			body: JSON.stringify({message: "Successfully updated the note"})
		}
	} catch(err) {
		return {
			statusCode: 500,
			body: JSON.stringify({message: err.message})
		}
	}
}
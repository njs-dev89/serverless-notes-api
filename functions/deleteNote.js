const { DeleteCommand } = require("@aws-sdk/lib-dynamodb")
const { docClient, NOTES_TABLE } = require("../utils/docClient")

exports.handler = async (event, context) =>{
	const id = event.pathParameters.id
	const params = {
		TableName: NOTES_TABLE,
		Key: {
			noteId: id
		},
		ConditionExpression: 'attribute_exists(noteId)'
	}
	const command = new DeleteCommand(params)
	try {
		await docClient.send(command)
		
		return {
			statusCode: 200,
			body: JSON.stringify({message: "Note is deleted"})
		}
	} catch(err) {
		return {
			statusCode: 500,
			body: JSON.stringify({message: err.message})
		}
	}
}
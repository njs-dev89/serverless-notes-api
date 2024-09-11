const { GetCommand } = require("@aws-sdk/lib-dynamodb")
const { docClient, NOTES_TABLE } = require("../utils/docClient")
exports.handler = async (event, context) =>{
	const id = event.pathParameters.id
	const params = {
		TableName: NOTES_TABLE,
		Key: {
			noteId: id
		}
	}
	const command = new GetCommand(params)
	try {
		const data = await docClient.send(command)
		if(!data.Item) {
			return {
				statusCode: 404,
				body: JSON.stringify({message: "Note not found"})
			}
		}
		return {
			statusCode: 200,
			body: JSON.stringify(data.Item)
		}
	} catch(err) {
		return {
			statusCode: 500,
			body: JSON.stringify({message: err.message})
		}
	}
}
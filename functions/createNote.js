const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient, NOTES_TABLE } = require("../utils/docClient");



exports.handler = async (event, context) =>{
	const data = JSON.parse(event.body)
	const params = {
		TableName: NOTES_TABLE,
		Item: { noteId: crypto.randomUUID(), title: data.title, body: data.body },
		ConditionExpression: 'attribute_not_exists(noteId)'
	  };
	try {
		const command = new PutCommand(params)
		await docClient.send(command)
		return {
			statusCode: 201,
			body: JSON.stringify({message: "A new note created"})
		}
	} catch(err) {
		return {
			statusCode: 500,
			body: JSON.stringify({message: err.message})
		}
	}

}
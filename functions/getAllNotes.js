const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient, NOTES_TABLE } = require("../utils/docClient");
exports.handler = async (event, context) =>{
	const params = {
		TableName: NOTES_TABLE,
	}
	let lastEvaluatedKey = null
	let allItems = []

	try {
		do {
			if(lastEvaluatedKey) {
				params.ExclusivStartKey = lastEvaluatedKey
			}
			const data = await docClient.send(new ScanCommand(params))
			lastEvaluatedKey = data.LastEvaluatedKey
			allItems = allItems.concat(data.Items)
		} while(lastEvaluatedKey)
		return {
			statusCode: 200,
			body: JSON.stringify({items: allItems})
		}
	} catch(err) {
		return {
			statusCode: 500,
			body: JSON.stringify({message: err.message})
		}
	}
}
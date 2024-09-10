exports.handler = async (event, context) =>{
	return {
		statusCode: 200,
		body: JSON.stringify({message: "Get all notes handler function called"})
	}
}
exports.handler = async (event, context) =>{
	return {
		statusCode: 201,
		body: JSON.stringify({message: "Create note handler function called"})
	}
}
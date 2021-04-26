module.exports.hello = async event => {
	console.log(process.env.test);

	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				table: process.env.test,
				message: "Go Serverless v1.0! Your function executed successfully!",
				input: event
			},
			null,
			2
		)
	};
};

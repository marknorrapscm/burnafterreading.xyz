const AWS = require("aws-sdk");
const appendStageToAssetName = require("../utility/append-stage-to-asset-name");

module.exports = async note => {
	const noteAsDynamoObj = AWS.DynamoDB.Converter.marshall(note);
	await writeToDynamo(noteAsDynamoObj);

	return true;
};

const writeToDynamo = async noteAsDynamoObj => {
	console.log(`Writing to: ${ process.env.tableName}`);
	console.log(appendStageToAssetName(process.env.tableName));

	const sdk = new AWS.DynamoDB();
	return sdk.putItem({
		TableName: appendStageToAssetName(process.env.tableName),
		Item: noteAsDynamoObj
	}).promise();
};

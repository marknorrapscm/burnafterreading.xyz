const AWS = require("aws-sdk");
const appendStageToAssetName = require("../utility/append-stage-to-asset-name");

module.exports = async note => {
	if (!note) {
		throw Error("No note supplied to updateNote()");
	}

	await writeToDynamo(note);

	return true;
};

const writeToDynamo = async note => {
	const sdk = new AWS.DynamoDB();
	const params = {
		TableName: appendStageToAssetName(process.env.tableName),
		Key: {
			"noteHash": { S: note.noteHash }
		},
		UpdateExpression: "set readCount = :readCount, hasBeenBurned = :hasBeenBurned",
		ExpressionAttributeValues: {
			":readCount": { N: note.readCount.toString() },
			":hasBeenBurned": { BOOL: note.hasBeenBurned }
		}
	};

	await sdk.updateItem(params).promise();
};

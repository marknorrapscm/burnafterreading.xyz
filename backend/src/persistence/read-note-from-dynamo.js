const AWS = require("aws-sdk");
const Note = require("../domain/entities/Note");
const appendStageToAssetName = require("../utility/append-stage-to-asset-name");

module.exports = async noteHash => {
	const sdk = new AWS.DynamoDB();
	const res = await sdk.getItem({
		TableName: appendStageToAssetName(process.env.tableName),
		Key: {
			"noteHash": { "S": noteHash }
		}
	}).promise();

	return extractItem(res);
};

const extractItem = res => {
	if (res && res.Item) {
		const obj = AWS.DynamoDB.Converter.unmarshall(res.Item);

		if (!obj.hasBeenBurned) {
			return new Note(obj);
		} else {
			console.log(`Attempted to access burned note: ${ obj.noteHash}`);
			return undefined;
		}
	}
};

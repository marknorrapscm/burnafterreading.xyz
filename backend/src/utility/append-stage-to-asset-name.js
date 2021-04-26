module.exports = assetName => {
	if (!process.env.stage || process.env.stage === "dev") {
		return `${assetName}-dev`;
	} else if (process.env.stage === "prod") {
		return `${assetName}-prod`;
	} else {
		throw Error(`Stage not recognised: ${process.env.stage}`);
	}
};

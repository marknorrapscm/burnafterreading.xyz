module.exports = (error, functionName) => {
	console.error(`Error thrown in: ${functionName}`);
	console.error(error);
};

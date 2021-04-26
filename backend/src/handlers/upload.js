const getFileUploadUrl = require("../application/get-file-upload-url");
const responseFactory = require("../domain/factories/response-factory");

module.exports.getAudioUploadUrl = async event => {
	try {
		const { uploadUrl, fileNameWithExtension } = await getFileUploadUrl();

		return responseFactory(true, "", {
			uploadUrl: uploadUrl,
			fileNameWithExtension: fileNameWithExtension
		});
	} catch (e) {
		return responseFactory(false, e.message);
	}
};

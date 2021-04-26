
export const getBaseUrl = (apiCall = false) => {
	if (process.env.NODE_ENV === "development") {
		if (apiCall) {
			return "http://localhost:5001/dev";
		} else {
			return "http://localhost:5000";
		}
	} else {
		if (apiCall) {
			return "https://w3qz5t2m45.execute-api.eu-west-1.amazonaws.com/prod";
		} else {
			return "https://www.burnafterreading.xyz";
		}
	}
};
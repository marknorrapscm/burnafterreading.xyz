/**
 * Taken from: 
 * https://gist.github.com/yousifalraheem/f61afaaf30c2db5ab9e0910e72edd886#file-browser-detect-js
 */

export const isBrowserSafari = () => {
	return isSafari();
};

function isSafari() {
	return ("ApplePaySetupFeature" in window || "safari" in window) && agentHas("Safari") && !agentHas("Chrome") && !agentHas("CriOS");
}

function agentHas(keyword: string) {
	return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
}
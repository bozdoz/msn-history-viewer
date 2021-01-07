/**
 * Uses DOMParser to parse xml text into DOM object
 * @param {string} text
 */
export const parseXML = (text) =>
	new window.DOMParser().parseFromString(text, "text/xml");

/**
 * Perhaps more literally: fetch XML
 * @param {string} path
 */
export const loadXML = async (path) => {
	const response = await fetch(path);
	const status = response.status;

	if (status !== 200) {
		throw new Error("No file found!");
	}

	return response.text();
};

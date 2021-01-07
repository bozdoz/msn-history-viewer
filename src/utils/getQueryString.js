/**
 * Parsed query string into an object
 *
 * @returns {Record<string, string>}
 */
const getQueryString = () => {
	const { search } = window.location;

	// strip '?', split '&', reduce and split by '='
	const parsed = search
		.substr(1)
		.split("&")
		.reduce((prev, cur) => {
			const [key, value] = cur.split("=");
			prev[key] = value;

			return prev;
		}, {});

	return parsed;
};

export default getQueryString;

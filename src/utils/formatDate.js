const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const months = [
	"January",
	"February",
	"March",
	"April",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

/**
 * format date
 * @param {Date} date
 */
const formatDate = (date) => {
	const dow = days[date.getDay()];
	const month = months[date.getMonth()];
	const dom = date.getDate();
	const year = date.getFullYear();
	const time = date.toLocaleTimeString();

	return `${dow}, ${month} ${dom}, ${year}, ${time}`;
};

export default formatDate;

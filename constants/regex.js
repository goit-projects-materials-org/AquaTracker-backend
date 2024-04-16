const dayDateRegexp = /^\d{4}-\d{2}-\d{2}$/;
const monthDateRegexp = /^\d{4}-\d{2}$/;
const emailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const timeUTCRegexp = /Z$/;

module.exports = { dayDateRegexp, monthDateRegexp, emailRegexp, timeUTCRegexp };
const { HttpError } = require('../helpers');
const { dayDateRegexp } = require('../constants/regex');

const isValidDayDate = (req, res, next) => {
  const { date } = req.params;
  if (!dayDateRegexp.test(date)) {
    return next(HttpError(400, `${date} is not a valid date. Date must be in the format YYYY-MM-DD`));
  }
  next();
};

module.exports = isValidDayDate;

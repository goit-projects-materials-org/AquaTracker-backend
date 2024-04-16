const { HttpError } = require('../helpers');
const { monthDateRegexp } = require('../constants/regex');

const isValidMonthDate = (req, res, next) => {
  const { date } = req.params;
  if (!monthDateRegexp.test(date)) {
    return next(HttpError(400, `${date} is not a valid date. Date must be in the format YYYY-MM`));
  }
  next();
};

module.exports = isValidMonthDate;

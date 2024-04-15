const { HttpError } = require('../helpers');
const { dateRegexp } = require('../constants/regex');

const isValidDate = (req, res, next) => {
  const { date } = req.params;
  if (!dateRegexp.test(date)) {
    return next(HttpError(400, `${date} is not a valid date. Date must be in the format YYYY-MM-DD`));
  }
  next();
};

module.exports = isValidDate;

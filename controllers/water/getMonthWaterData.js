const { Water } = require('../../models/water');
const { HttpError } = require('../../helpers');

const getMonthWaterData = async (req, res) => {
  const { date } = req.params;
  const { _id: owner } = req.user;

  const [year, month] = date.split('-');

  const utcDate = new Date(Date.UTC(year, month - 1, 1));

  const lastDayOfMonth = new Date(Date.UTC(year, month, 0));
  lastDayOfMonth.setUTCHours(23, 59, 59, 999);

  const foundWaterMonthData = await Water.find({
    owner,
    date: {
      $gte: utcDate,
      $lt: lastDayOfMonth,
    },
  })
    .sort({ date: 1 })
    .select('-createdAt -updatedAt');

  if (!foundWaterMonthData) {
    throw HttpError(404, `Info for ${date} not found`);
  }

  res.status(200).json(foundWaterMonthData);
};

module.exports = getMonthWaterData;

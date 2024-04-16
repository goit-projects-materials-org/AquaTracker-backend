const { Water } = require('../../models/water');
const { HttpError } = require('../../helpers');

const getMonthWaterData = async (req, res) => {
  const { date } = req.params;
  const { _id: owner } = req.user;

  const [year, month] = date.split('-');

  const utcDate = new Date(Date.UTC(year, month - 1, day));

  const startOfDay = new Date(utcDate);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(utcDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const foundWaterDayData = await Water.findOne({
    owner,
    date: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  if (!foundWaterDayData) {
    throw HttpError(404, `Info for ${date} not found`);
  }

  res.status(200).json(foundWaterDayData);
};

module.exports = getMonthWaterData;

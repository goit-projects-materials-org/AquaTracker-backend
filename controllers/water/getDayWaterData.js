import { Water } from '../../models/water.js';
import { HttpError } from '../../helpers/HttpError.js';

const getDayWaterData = async (req, res) => {
  const { _id: owner } = req.user;

  const date = new Date(req.params.date);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  startOfDay.setMinutes(startOfDay.getMinutes() + date.getTimezoneOffset());
  const utcStart = startOfDay.toISOString();

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);
  endOfDay.setMinutes(endOfDay.getMinutes() + date.getTimezoneOffset());
  const utcEnd = endOfDay.toISOString();

  const foundWaterDayData = await Water.find({
    owner,
    date: {
      $gte: utcStart,
      $lt: utcEnd,
    },
  }).select('-createdAt -updatedAt');

  if (!foundWaterDayData) {
    throw HttpError(404, `Info for this day not found`);
  }

  res.status(200).json({
    date,
    consumedAmountWater: foundWaterDayData.reduce((acc, i) => acc + i.amount, 0),
    waterDailyNorma: foundWaterDayData.length > 0 ? foundWaterDayData[0].waterDailyNorma : req.user.waterDailyNorma,
    consumedWaterDoses: foundWaterDayData,
    owner,
  });
};

export default getDayWaterData;

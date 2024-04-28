import { Water } from '../../models/water.js';
import { HttpError } from '../../helpers/HttpError.js';

const getMonthWaterData = async (req, res) => {
  const { _id: owner } = req.user;
  const date = new Date(req.params.date);
  const year = date.getFullYear();
  const month = date.getMonth();

  const startDayOfMonth = new Date(Date.UTC(year, month, 1));
  startDayOfMonth.setMinutes(startDayOfMonth.getMinutes() + date.getTimezoneOffset());
  const utcStart = startDayOfMonth.toISOString();

  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
  lastDayOfMonth.setUTCHours(23, 59, 59, 999);
  lastDayOfMonth.setMinutes(lastDayOfMonth.getMinutes() + date.getTimezoneOffset());
  const utcEnd = lastDayOfMonth.toISOString();

  const foundWaterMonthData = await Water.find({
    owner,
    date: {
      $gte: utcStart,
      $lt: utcEnd,
    },
  })
    .sort({ date: 1 })
    .select('-createdAt -updatedAt');

  if (!foundWaterMonthData) {
    throw HttpError(404, `Info for this month not found`);
  }

  res.status(200).json(foundWaterMonthData);
};

export default getMonthWaterData;

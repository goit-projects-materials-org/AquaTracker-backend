const { Water } = require('../../models/water');
const { HttpError } = require('../../helpers');

const addWater = async (req, res) => {
  const { amount, time } = req.body;
  const { _id: owner } = req.user;

  if (new Date(time) > new Date()) {
    throw HttpError(400, 'Cannot add water consumption for future time');
  }

  const startOfDay = new Date(time);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(time);
  endOfDay.setUTCHours(23, 59, 59, 999);

  let data;

  const foundWaterDayData = await Water.findOne({
    owner,
    date: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  if (foundWaterDayData) {
    data = await Water.findByIdAndUpdate(
      foundWaterDayData._id,
      {
        $inc: { consumedAmountWater: +amount },
        $push: { consumedWaterDoses: { amount, time } },
      },
      { new: true },
    ).select('-createdAt -updatedAt');
  } else {
    const newWaterDay = {
      date: time,
      consumedAmountWater: amount,
      waterDailyNorma: req.user.waterDailyNorma,
      consumedWaterDoses: [{ amount, time }],
      owner,
    };

    const createdWater = await Water.create(newWaterDay);
    const { createdAt, updatedAt, ...water } = createdWater.toObject();
    data = water;
  }

  res.status(200).json(data);
};

module.exports = addWater;

const ObjectId = require('mongodb').ObjectId;
const { Water } = require('../../models/water');
const { HttpError } = require('../../helpers');

const updateWater = async (req, res) => {
  const { id } = req.params;
  const { amount, time } = req.body;
  const { _id: owner } = req.user;

  if (new Date(time) > new Date()) {
    throw HttpError(400, 'Cannot add water consumption for future time');
  }

  const foundWaterDayData = await Water.findOne({
    owner,
    'consumedWaterDoses._id': ObjectId(id),
  });

  if (!foundWaterDayData) {
    throw HttpError(404, 'Info about this consumed water dose not found');
  }

  const foundConsumedWaterDose = foundWaterDayData.consumedWaterDoses.find((item) => item._id.toString() === id);

  const updatedConsumedWaterDose = await Water.findOneAndUpdate(
    { 'consumedWaterDoses._id': ObjectId(id) },
    {
      $set: {
        consumedAmountWater: foundWaterDayData.consumedAmountWater - foundConsumedWaterDose.amount + amount,
        'consumedWaterDoses.$': { amount, time, _id: ObjectId(id) },
      },
    },
    { new: true },
  );
  const { createdAt, updatedAt, ...data } = updatedConsumedWaterDose.toObject();

  res.status(200).json(data);
};

module.exports = updateWater;

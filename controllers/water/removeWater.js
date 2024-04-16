const ObjectId = require('mongodb').ObjectId;
const { Water } = require('../../models/water');
const { HttpError } = require('../../helpers');

const removeWater = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const foundWaterDayData = await Water.findOne({
    owner,
    'consumedWaterDoses._id': ObjectId(id),
  });
  if (!foundWaterDayData) {
    throw HttpError(404, 'Info about this consumed water dose not found');
  }
    
  const foundConsumedWaterDose = foundWaterDayData.consumedWaterDoses.find((item) => item._id.toString() === id);

  const data = await Water.findOneAndUpdate(
    { owner, 'consumedWaterDoses._id': ObjectId(id) },
    {
      $inc: { consumedAmountWater: -foundConsumedWaterDose.amount },
      $pull: { consumedWaterDoses: { _id: ObjectId(id) } },
    },
    { new: true },
  ).select('-createdAt -updatedAt');

  res.status(200).json(data);
};

module.exports = removeWater;

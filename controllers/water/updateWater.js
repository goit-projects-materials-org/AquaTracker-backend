import {ObjectId} from 'mongodb';
import { Water } from '../../models/water.js';
import { HttpError } from '../../helpers/HttpError.js';

const updateWater = async (req, res) => {
  const { id } = req.params;
  const { amount, date } = req.body;
  const { _id: owner } = req.user;

  const updatedConsumedWaterDose = await Water.findOneAndUpdate(
    { _id: ObjectId(id), owner },
    {
      $set: {
        amount,
        date,
      },
    },
    { new: true },
  );

  if (!updatedConsumedWaterDose) {
    throw HttpError(404, 'Info about this consumed water dose not found');
  }

  const { createdAt, updatedAt, ...waterNotice } = updatedConsumedWaterDose.toObject();

  res.status(200).json(waterNotice);
};

export default  updateWater;

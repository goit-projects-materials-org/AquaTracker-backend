import {ObjectId} from 'mongodb';
import { Water } from '../../models/water.js';
import { HttpError } from '../../helpers/HttpError.js';

const removeWater = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const removedWaterData = await Water.findOneAndRemove({
    owner,
    _id: ObjectId(id),
  }).select('-createdAt -updatedAt');

  if (!removedWaterData) {
    throw HttpError(404, 'Info about this consumed water dose not found');
  }

  res.status(200).json(removedWaterData);
};

export default  removeWater;

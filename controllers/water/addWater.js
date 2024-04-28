import { Water } from '../../models/water.js';

const addWater = async (req, res) => {
  const { amount, date } = req.body;
  const { _id: owner } = req.user;

  const newWaterNotice = {
    date,
    waterDailyNorma: req.user.waterDailyNorma,
    amount,
    owner,
  };

  const createdWaterNotice = await Water.create(newWaterNotice);
  const { createdAt, updatedAt, ...waterNotice } = createdWaterNotice.toObject();

  res.status(200).json(waterNotice);
};

export default addWater;

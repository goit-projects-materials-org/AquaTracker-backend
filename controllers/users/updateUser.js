const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const { Water } = require('../../models/water');

const updateUser = async (req, res) => {
  const { _id: currentUserId } = req.user;
  const { name, email, gender, weight, activeTime, waterDailyNorma } = req.body;

  const newData = {};
  name && (newData.name = name);
  gender && (newData.gender = gender);
  weight && (newData.weight = weight);
  activeTime && (newData.activeTime = activeTime);
  req.file?.path && (newData.avatarURL = req.file.path);

  if (email) {
    const foundUser = await User.findOne({ email, _id: { $ne: currentUserId } });
    if (foundUser) {
      throw HttpError(409, 'Such email already exists');
    }
    newData.email = email;
  }
  if (waterDailyNorma) {
    newData.waterDailyNorma = waterDailyNorma;
  }

  const { password, token, refreshToken, createdAt, updatedAt, _id, ...user } = await User.findByIdAndUpdate(currentUserId, newData, { new: true }).lean();

  const currentDateUTC = new Date().toISOString();
  const startOfDay = new Date(currentDateUTC);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(currentDateUTC);
  endOfDay.setUTCHours(23, 59, 59, 999);
  const foundWaterDayData = await Water.findOne({
    owner: currentUserId,
    date: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });
  await Water.findByIdAndUpdate(foundWaterDayData._id, { waterDailyNorma }, { new: true }).lean();

  res.status(200).json(user);
};

module.exports = updateUser;

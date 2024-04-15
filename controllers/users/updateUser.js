const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const updateUser = async (req, res) => {
  const { _id: currentUserId } = req.user;
  const { name, email, gender, weight, activeTime, waterDailyNorma } = req.body;

  const newData = {};
  name && (newData.name = name);
  gender && (newData.gender = gender);
  weight && (newData.weight = weight);
  activeTime && (newData.activeTime = activeTime);
  req.file.path && (newData.avatarURL = req.file.path);

  if (email) {
    const foundUser = await User.findOne({ email, _id: { $ne: currentUserId } });
    if (foundUser) {
      throw HttpError(409, 'Such email already exists');
    }
    newData.email = email;
  }
  if (waterDailyNorma) {
    newData.waterDailyNorma = waterDailyNorma;
    ///add water logic
  }

  const { password, token, refreshToken, createdAt, updatedAt, ...user } = await User.findByIdAndUpdate(currentUserId, newData, { new: true }).lean();
  res.status(200).json(user);
};

module.exports = updateUser;

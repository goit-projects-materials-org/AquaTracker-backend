import { HttpError } from '../../helpers/HttpError.js';
import { User } from '../../models/user.js';
import { Water } from '../../models/water.js';

const updateUser = async (req, res) => {
  const { _id: currentUserId } = req.user;
  const { name, email, gender, weight, activeTime, waterDailyNorma, date } = req.body;

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

  const { password, createdAt, updatedAt, _id, ...user } = await User.findByIdAndUpdate(currentUserId, newData, { new: true }).lean();

  if (waterDailyNorma) {
    const currentDate = new Date(date);
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset());

    const startOfDay = new Date(currentDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    startOfDay.setMinutes(startOfDay.getMinutes() + currentDate.getTimezoneOffset());
    const utcStart = startOfDay.toISOString();

    const endOfDay = new Date(currentDate);
    endOfDay.setUTCHours(23, 59, 59, 999);
    endOfDay.setMinutes(endOfDay.getMinutes() + currentDate.getTimezoneOffset());
    const utcEnd = endOfDay.toISOString();

    const updateData = {
      $set: {
        waterDailyNorma,
      },
    };

    await Water.updateMany(
      {
        owner: currentUserId,
        date: {
          $gte: utcStart,
          $lt: utcEnd,
        },
      },
      updateData,
      { new: true },
    ).lean();
  }

  res.status(200).json(user);
};

export default updateUser;

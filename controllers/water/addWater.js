const { HttpError } = require('../../helpers');
const { Water } = require('../../models/water');

const addWater = async (req, res) => {
  const { date, amount, time } = req.body;
  const { _id: owner } = req.user;
  let data;
  const foundWaterDayData = await Water.findOne({ owner, date });

//   if (foundWaterDayData) {
//     data = await Water.findByIdAndUpdate(
//       foundWaterDayData._id,
//       {
//         $inc: { consumedAmountWater: +amount },
//         $push: { consumedWaterDoses: { amount, time } },
//       },
//       { new: true },
//     ).select('-createdAt -updatedAt');
//   }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = {
    email,
    name: email.split('@')[0],
    password: hashPassword,
  };
  const user = await User.create(newUser);

  const payload = { id: user._id };

  const createdToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  const createdRefreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });

  const { name, avatarURL, gender, waterDailyNorma, weight, activeTime, token, refreshToken } = await User.findByIdAndUpdate(
    user._id,
    { token: createdToken, refreshToken: createdRefreshToken },
    { new: true },
  );
  res.status(201).json({ email, name, avatarURL, gender, weight, activeTime, waterDailyNorma, token, refreshToken });
};

module.exports = addWater;

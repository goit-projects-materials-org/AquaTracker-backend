const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const updateUser = async (req, res) => {
    console.log(req)
//   const { email, password } = req.body;
//   const foundUser = await User.findOne({ email });
//   if (!foundUser) {
//     throw HttpError(401, 'Email or password invalid');
//   }
//   const isCorrectPassword = await bcrypt.compare(password, foundUser.password);
//   if (!isCorrectPassword) {
//     throw HttpError(401, 'Email or password invalid');
//   }
//   const payload = { id: foundUser._id };
//   const createdToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
//   const createdRefreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });

//   const { name, avatarURL, gender, waterDailyNorma, token, refreshToken } = await User.findByIdAndUpdate(
//     foundUser._id,
//     { token: createdToken, refreshToken: createdRefreshToken },
//     { new: true },
//   );
  res.status(200).json({  });
};

module.exports = updateUser;

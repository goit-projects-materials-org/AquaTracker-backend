const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw HttpError(401, 'Email or password invalid');
  }
  const isCorrectPassword = await bcrypt.compare(password, foundUser.password);
  if (!isCorrectPassword) {
    throw HttpError(401, 'Email or password invalid');
  }
  const payload = { id: foundUser._id };
  const createdToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  const createdRefreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });

  const { name, avatarURL, gender, waterDailyNorma, token, refreshToken } = await User.findByIdAndUpdate(
    foundUser._id,
    { token: createdToken, refreshToken: createdRefreshToken },
    { new: true },
  );
  res.status(201).json({ email, name, avatarURL, gender, waterDailyNorma, token, refreshToken });
};

module.exports = signin;

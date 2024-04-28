import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../../helpers/HttpError.js';
import { User } from '../../models/user.js';
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

  const { name, avatarURL, gender, weight, activeTime, waterDailyNorma, token, refreshToken } = await User.findByIdAndUpdate(
    foundUser._id,
    { token: createdToken, refreshToken: createdRefreshToken },
    { new: true },
  );
  res.status(201).json({ email, name, avatarURL, gender, weight, activeTime, waterDailyNorma, token, refreshToken });
};

export default signin;

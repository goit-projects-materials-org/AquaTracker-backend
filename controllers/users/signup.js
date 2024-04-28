import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../../helpers/HttpError.js';
import { User } from '../../models/user.js';

const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    throw HttpError(409, 'Such email already exists');
  };

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

export default signup
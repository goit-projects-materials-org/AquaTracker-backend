const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refreshCurrentUser = async (req, res) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    throw HttpError(401);
  }

  const { id } = jwt.verify(token, REFRESH_SECRET_KEY);

  if (!id) {
    throw HttpError(401);
  }
  const foundUser = await User.findById(id);

  if (!foundUser || !foundUser.refreshToken || foundUser.refreshToken !== token) {
    throw HttpError(401);
  }
  const payload = { id: foundUser._id };

  const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  const newRefreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });

  await User.findByIdAndUpdate(foundUser._id, { token: newToken, refreshToken: newRefreshToken });
  res.status(201).json({ token: newToken, refreshToken: newRefreshToken });
};

module.exports = refreshCurrentUser;

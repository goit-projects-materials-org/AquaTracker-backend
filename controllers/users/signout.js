const { User } = require('../../models/user');

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '', refreshToken: '' });
  res.json({ message: 'Sign out success' });
};

module.exports = signout
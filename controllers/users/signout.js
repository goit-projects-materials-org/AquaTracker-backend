import { User } from '../../models/user.js';

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '', refreshToken: '' });
  res.json({ message: 'Sign out success' });
};

export default signout
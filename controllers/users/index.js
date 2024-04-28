import { CtrlWrapper } from '../../helpers/CtrlWrapper.js';
import signup from './signup.js';
import signin from './signin.js';
import currentUser from './currentUser.js';
import updateUser from './updateUser.js';
import refreshCurrentUser from './refreshCurrentUser.js';
import signout from './signout.js';

export default {
  signup: CtrlWrapper(signup),
  signin: CtrlWrapper(signin),
  currentUser: CtrlWrapper(currentUser),
  updateUser: CtrlWrapper(updateUser),
  refreshCurrentUser: CtrlWrapper(refreshCurrentUser),
  signout: CtrlWrapper(signout),
};

const {  CtrlWrapper } = require('../../helpers');
const signup = require('./signup');
const signin = require('./signin');
const currentUser = require('./currentUser');
const refreshCurrentUser = require('./refreshCurrentUser');
const signout = require('./signout');

module.exports = {
  signup: CtrlWrapper(signup),
  signin: CtrlWrapper(signin),
  currentUser: CtrlWrapper(currentUser),
  refreshCurrentUser: CtrlWrapper(refreshCurrentUser),
  signout: CtrlWrapper(signout),
};

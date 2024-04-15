const express = require('express');
const ctrl = require('../../controllers/users');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const router = express.Router();

router.post('/signup', validateBody(schemas.signupSchema), ctrl.signup);
router.post('/signin', validateBody(schemas.signinSchema), ctrl.signin);
router.get('/current', authenticate, ctrl.currentUser);
router.patch('/current/edit', authenticate, upload.single('avatar'), validateBody(schemas.updateUserSchema), ctrl.updateUser);
router.get('/current/refresh', ctrl.refreshCurrentUser);
router.post('/signout', authenticate, ctrl.signout);

module.exports = router;

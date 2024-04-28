import express from 'express';
import ctrl from '../../controllers/users/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { upload } from '../../middlewares/upload.js';
import { schemas } from '../../models/user.js';

const router = express.Router();

router.post('/signup', validateBody(schemas.signupSchema), ctrl.signup);
router.post('/signin', validateBody(schemas.signinSchema), ctrl.signin);
router.get('/current/refresh', ctrl.refreshCurrentUser);
router.get('/current', authenticate, ctrl.currentUser);
router.patch('/current/edit', authenticate, upload.single('avatar'), validateBody(schemas.updateUserSchema), ctrl.updateUser);
router.post('/signout', authenticate, ctrl.signout);

export default router;

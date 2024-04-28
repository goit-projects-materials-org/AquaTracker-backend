import express from 'express';
import ctrl from '../../controllers/water/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { schemas } from '../../models/water.js';

const router = express.Router();

router.use(authenticate);

router.post('/add', validateBody(schemas.addWaterSchema), ctrl.addWater);
router.patch('/edit/:id',  isValidId, validateBody(schemas.updateWaterSchema), ctrl.updateWater);
router.delete('/remove/:id', isValidId, ctrl.removeWater);
router.get('/day/:date', ctrl.getDayWaterData);
router.get('/month/:date', ctrl.getMonthWaterData);

export default router;

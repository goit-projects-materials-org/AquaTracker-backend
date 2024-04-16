const express = require('express');
const ctrl = require('../../controllers/water');
const { validateBody, isValidId, isValidDayDate, isValidMonthDate, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/water');
const router = express.Router();

router.post('/add', authenticate, validateBody(schemas.addWaterSchema), ctrl.addWater);
router.patch('/edit/:id', authenticate, isValidId, validateBody(schemas.updateWaterSchema), ctrl.updateWater);
router.delete('/remove/:id', authenticate, isValidId, ctrl.removeWater);
router.get('/day/:date', authenticate, isValidDayDate, ctrl.getDayWaterData);
router.get('/month/:date', authenticate, isValidMonthDate, ctrl.getMonthWaterData);

module.exports = router;

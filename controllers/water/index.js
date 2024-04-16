const { CtrlWrapper } = require('../../helpers');
const addWater = require('./addWater');
const updateWater = require('./updateWater');
const removeWater = require('./removeWater');
const getDayWaterData = require('./getDayWaterData');
const getMonthWaterData = require('./getMonthWaterData');


module.exports = {
  addWater: CtrlWrapper(addWater),
  updateWater: CtrlWrapper(updateWater),
  removeWater: CtrlWrapper(removeWater),
  getDayWaterData: CtrlWrapper(getDayWaterData),
  getMonthWaterData: CtrlWrapper(getMonthWaterData)
};

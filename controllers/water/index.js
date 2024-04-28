import { CtrlWrapper } from '../../helpers/CtrlWrapper.js';
import addWater from './addWater.js';
import updateWater from './updateWater.js';
import removeWater from './removeWater.js';
import getDayWaterData from './getDayWaterData.js';
import getMonthWaterData from './getMonthWaterData.js';

export default {
  addWater: CtrlWrapper(addWater),
  updateWater: CtrlWrapper(updateWater),
  removeWater: CtrlWrapper(removeWater),
  getDayWaterData: CtrlWrapper(getDayWaterData),
  getMonthWaterData: CtrlWrapper(getMonthWaterData),
};

const settingModel = require("../../models/setting.model");

module.exports = {
  addSetting: async (data) => {
    const addData = await settingModel(data).save();
    return addData;
  },
  updateSetting: async (id, data) => {
    const updateData = await settingModel.findByIdAndUpdate(id,{ $set: data });
    return updateData;
  },
  getAllSettingData: async () => {
    const data = await settingModel.find();
    return data[0];
  },
};

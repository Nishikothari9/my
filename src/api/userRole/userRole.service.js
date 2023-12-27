const userRoleModel = require('../../models/userRole.model');

module.exports = {
    getAllUserRole: async () => {
        const data = await userRoleModel.find();
        return data;
    },
    addUserRole: async (data) => {
        const userData = await userRoleModel(data).save();
        return userData;
    },
    editUserRole: async (id, roleName) => {
        const data = await userRoleModel.findByIdAndUpdate(id, {
            $set: { name: roleName },
        });
        return data;
    },
    deleteUserRole: async (id) => {
        const data = await userRoleModel.findByIdAndDelete(id);
        return data;
    },
};
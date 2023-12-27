const projectModel = require("../../models/project.model");

module.exports = {
  addNewProject: async (data) => {
    const projectData = await projectModel(data).save();
    return projectData;
  },
  getAllProject: async () => {
    const projectData = await projectModel.find().sort({ _id: -1 });
    return projectData;
  },
  updateProject: async (id, data) => {
    const updateData = await projectModel.findByIdAndUpdate(id, { $set: data });
    return updateData;
  },
  getMyAllProject: async (id) => {
    const projectList = projectModel.find({ employeeId: id }).sort({ _id: -1 });
    return projectList;
  },
  deleteProject: async (id) => {
    const data = await projectModel.findByIdAndDelete(id);
    return data;
  },
  getProject: async(id) => {
    const data = projectModel.findById(id);
    return data;
  }
};

const ticketModel = require("../../models/ticket.model");

module.exports = {
  addTicket: async (data) => {
    const addData = await ticketModel(data).save();
    return addData;
  },
  updateTicket: async (id, data) => {
    const updateData = await ticketModel.findByIdAndUpdate(id, { $set: data })
    return updateData;
  },
  getAllTicket: async () => {
    const data = await ticketModel.find().sort({ _id: -1 });
    return data;
  },
  getMyAllTicket: async (id) => {
    const taskList = ticketModel.find({ employeeId: id }).sort({ _id: -1 });
    return taskList;
  },
  deleteTicket: async (id) => {
    const data = await ticketModel.findByIdAndDelete(id);
    return data;
  },
  getTicket: async(id) => {
    const ticketDetails = ticketModel.findById(id);
    return ticketDetails;
  }
};

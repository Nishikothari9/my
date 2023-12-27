const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const ticketService = require("./ticket.service");
const moment = require("moment");

const addTicket = catchAsync(async (req, res) => {
  const attachments = req.files.map(
    (data) => `ticket/uploads/${data.filename}`
  );

  try {
    const data = {
      employeeId: req.body.employeeId,
      attachment: attachments,
      status: req.body.status,
      title: req.body.title,
      type: req.body.type,
      email: req.body.email,
      userName: req.body.userName,
      projectName: req.body.projectName,
      projectManagerEmail: req.body.projectManagerEmail,
      detailDescription: req.body.detailDescription,
    };
    const addNewTicket = await ticketService.addTicket(data);
    createResponse(res, httpStatus.OK, Messages.TICKET_ADDED, addNewTicket);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const getAllTicket = catchAsync(async (req, res) => {
  try {
    const allTicket = await ticketService.getAllTicket();
    createResponse(res, httpStatus.OK, Messages.GET_ALL_TICKET, allTicket);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const updateTicket = catchAsync(async (req, res) => {
  const attachments = req.files.map(
    (data) => `ticket/uploads/${data.filename}`
  );

  const obj = {
    ...req.body,
    attachment: req.files.length === 0 ? req.body.attachment : attachments,
  };

  try {
    const ticketUpdated = await ticketService.updateTicket(req.params.id, obj);
    createResponse(res, httpStatus.OK, Messages.TICKET_UPDATED, ticketUpdated);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const deleteTicket = catchAsync(async (req, res) => {
  try {
    const data = await ticketService.deleteTicket(req.params.id);
    createResponse(res, httpStatus.OK, Messages.TICKET_DELETED, data);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const getMyAllTicket = catchAsync(async (req, res) => {
  try {
    const id = req.params.id;
    const AllTicket = await ticketService.getMyAllTicket(id);
    createResponse(res, httpStatus.OK, Messages.GET_ALL_TICKET, AllTicket);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const getTicket = catchAsync(async (req, res) => {
  try {
    const Ticket = await ticketService.getTicket(req.params.id);
    createResponse(res, httpStatus.OK, Messages.GET_ALL_TICKET, Ticket);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

module.exports = {
  addTicket,
  updateTicket,
  getAllTicket,
  getMyAllTicket,
  deleteTicket,
  getTicket,
};

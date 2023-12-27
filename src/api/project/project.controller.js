const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const projectService = require("./project.service");
const moment = require("moment");

const addNewProject = catchAsync(async (req, res) => {
  const attachments = req.files.map(
    (data) => `project/uploads/${data.filename}`
  );

  try {
    const data = {
      ...req.body,
      attachment: attachments,
    };
    const newProject = projectService.addNewProject(data);
    createResponse(res, httpStatus.OK, Messages.PROJECT_ADDED, newProject);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const getAllProject = catchAsync(async (req, res) => {
  try {
    const projectDetail = await projectService.getAllProject();
    createResponse(res, httpStatus.OK, Messages.GET_ALL_PROJECT, projectDetail);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const updateProject = catchAsync(async (req, res) => {
  const attachments = req.files.map((data) => `project/${getFilePath(data)}`);

  const obj = {
    ...req.body,
    attachment: req.files.length === 0 ? req.body.attachment : attachments,
  };

  try {
    const projectUpdated = await projectService.updateProject(
      req.params.id,
      obj
    );
    createResponse(
      res,
      httpStatus.OK,
      Messages.PROJECT_UPDATED,
      projectUpdated
    );
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const deleteProject = catchAsync(async (req, res) => {
    try {
      const data = await projectService.deleteProject(req.params.id);
      createResponse(res, httpStatus.OK, Messages.PROJECT_DELETED, data);
    } catch (error) {
      console.log(error);
      createResponse(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        Messages.SOMETIN_WENT_WRONG
      );
    }
  });
  
const getMyAllProject = catchAsync(async (req, res) => {
  try {
    const id = req.params.id;
    const AllProject = await projectService.getMyAllProject(id);
    createResponse(res, httpStatus.OK, Messages.GET_ALL_PROJECT, AllProject);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const getProject = catchAsync(async (req, res) => {
  try {
    const projectData = await projectService.getProject(req.params.id);
    createResponse(res, httpStatus.OK, Messages.GET_ALL_PROJECT, projectData);
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
  addNewProject,
  updateProject,
  getAllProject,
  deleteProject,
  getMyAllProject,
  getProject
};

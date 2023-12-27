const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const blogService = require("./blog.service");
const multer = require("multer");

const addPost = catchAsync(async (req, res) => {
    try {
        const data = {
            employeeId: req.body.employeeId,
            cover: `uploads/${req.file.filename}`,
            status: req.body.status,
            title: req.body.title,
        };
        const addPost = await blogService.addPost(data);

        createResponse(res, httpStatus.OK, Messages.LIKE_ADDED, addPost);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getAllPost = catchAsync(async (req, res) => {
    try {
        const employeeId = req.params.id;
        const postData = await blogService.getAllPost(employeeId);
        createResponse(res, httpStatus.OK, Messages.POST_FETCHED, postData);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getPostDetail = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const postData = await blogService.getPostDetail(id);
        createResponse(res, httpStatus.OK, Messages.POST_FETCHED, postData);
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
    addPost,
    getAllPost,
    getPostDetail,
};

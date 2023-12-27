const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const likeSerivce = require("./like.service");
const blogService = require('../blog/blog.service');
const moment = require("moment");

const addLike = catchAsync(async (req, res) => {
    try {
        const data = req.body;
        const addLike = await likeSerivce.addLike(data);
        // ADD LIKE DATA TO POST
        const addLikeToPost = await blogService.addLikeToPost(
            data.postId,
            data.employeeId
        );
        createResponse(res, httpStatus.OK, Messages.LIKE_ADDED, addLike);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const removeLike = catchAsync(async (req, res) => {
    try {
        const data = req.body;
        const removeLike = await likeSerivce.removeLike(data.postId, data.employeeId);
        // REMOVE LIKE DATA TO POST
        const RemoveLikeFromPost = await blogService.removeLikeFromPost(
            data.postId,
            data.employeeId
        );
        createResponse(res, httpStatus.OK, Messages.UNLIKE, removeLike);
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
    addLike,
    removeLike
};

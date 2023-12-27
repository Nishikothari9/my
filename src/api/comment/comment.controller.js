const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const commentService = require("./comment.service");
const blogService = require('../blog/blog.service');

const moment = require("moment");

const addComment = catchAsync(async (req, res) => {
    try {
        const data = req.body;
        const addComment = await commentService.addComment(data);
        // ADD COMMENT ID TO POST DATA
        if (addComment._id) {
            const addCommentToPost = await blogService.addCommentToPost(data.postId,addComment._id);
        }
        createResponse(res, httpStatus.OK, Messages.COMMENT_ADDED, addComment);
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const removeComment = catchAsync(async (req, res) => {
    try {
        const data = req.body;
        const removeComment = await commentService.removeComment(data.postId, data.commentId);
        
        // REMOVE COMMENT ID TO POST DATA
        const removePostFromPost = await blogService.removeCommentFromPost(
            data.postId,
            data.commentId,
        );
        
        createResponse(res, httpStatus.OK, Messages.COMMENT_DELETED, removeComment);
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
    addComment,
    removeComment
};

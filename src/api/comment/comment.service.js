const commentModel = require("../../models/comment.model");

module.exports = {
    addComment: async (data) => {
        const commentData = await commentModel(data).save();
        return commentData;
    },
    removeComment: async(postId, commentId) => {
        const commentData = await commentModel.findOneAndUpdate(
            {
                _id: commentId,
                postId: postId,
            },
            {
                $set: { status: "Delete" },
            }
        );
    },
};

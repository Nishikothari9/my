const likeMode = require('../../models/like.mode');

module.exports = {
    addLike: async (data) => {
        const likeData = await likeMode(data).save();
        return likeData;
    },
    removeLike: async (postId, employeeId) => {
        const likeData = await likeMode.findOneAndRemove(
            {
                postId: postId,
                employeeId: employeeId,
            }
        );
        return likeData;
    },
};
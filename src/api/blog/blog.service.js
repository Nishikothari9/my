const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const blogModel = require("../../models/blog.model");

module.exports = {
    addPost: async (data) => {
        const commentData = await blogModel(data).save();
        return commentData;
    },
    addCommentToPost: async (postId, commentId) => {
        const commentToAdd = await blogModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $push: {
                    comment: commentId,
                },
            }
        );
        return commentToAdd;
    },
    addLikeToPost: async (postId, employeeId) => {
        const likeToAdd = await blogModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $push: {
                    like: employeeId,
                },
            }
        );
        return likeToAdd;
    },
    removeLikeFromPost: async (postId, employeeId) => {
        const likeToAdd = await blogModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                $pull: {
                    like: employeeId,
                },
            }
        );
        return likeToAdd;
    },
    removeCommentFromPost: async (postId, commentId) => {
        const commentToAdd = await blogModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $pull: {
                    comment: commentId,
                },
            }
        );
        return commentToAdd;
    },
    getAllPost: async(employeeId) => {
        const query = [
            {
                $match: {
                    status: "Active",
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $addFields: {
                    myLike: {
                        $cond: {
                            if: {
                                $in: [
                                    new ObjectId(employeeId),
                                    "$like",
                                ],
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "employeeId",
                    pipeline: [
                        {
                            $project: {
                                firstName: 1,
                                lastName: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "like",
                    foreignField: "_id",
                    as: "like",
                    pipeline: [
                        {
                            $project: {
                                firstName: 1,
                                lastName: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "comment",
                    foreignField: "_id",
                    as: "comment",
                    pipeline: [
                        {
                            $sort: {
                                _id: -1,
                            },
                        },
                        {
                            $lookup: {
                                from: "employees",
                                localField: "employeeId",
                                foreignField: "_id",
                                as: "employeeId",
                                pipeline: [
                                    {
                                        $project: {
                                            firstName: 1,
                                            lastName: 1,
                                            gender: 1,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            $unwind: {
                                path: "$employeeId",
                            },
                        },
                        {
                            $project: {
                                text: 1,
                                status: 1,
                                createdAt: 1,
                                employeeFirstName: "$employeeId.firstName",
                                employeeLastName: "$employeeId.lastName",
                                employeeId: "$employeeId._id",
                                employeeGender: "$employeeId.gender",
                            },
                        },
                    ],
                },
            },
            {
                $unwind: {
                    path: "$employeeId",
                },
            },
            {
                $project: {
                    postOwnerFirstName: "$employeeId.firstName",
                    postOwnerLastName: "$employeeId.lastName",
                    title: 1,
                    cover: 1,
                    like: 1,
                    comment: 1,
                    status: 1,
                    createdAt: 1,
                    totalComment: {
                        $size: "$comment",
                    },
                    totalLike: {
                        $size: "$like",
                    },
                    myLike: 1,
                },
            },
        ];

        const postData = await blogModel.aggregate(query);
        return postData;
    },
    getPostDetail: async(id) => {
        const query = [
            {
                $match: {
                    _id: new ObjectId(id),
                    status: "Active",
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "employeeId",
                    pipeline: [
                        {
                            $project: {
                                firstName: 1,
                                lastName: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "like",
                    foreignField: "_id",
                    as: "like",
                    pipeline: [
                        {
                            $project: {
                                firstName: 1,
                                lastName: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "comment",
                    foreignField: "_id",
                    as: "comment",
                    pipeline: [
                        {
                            $lookup: {
                                from: "employees",
                                localField: "employeeId",
                                foreignField: "_id",
                                as: "employeeId",
                                pipeline: [
                                    {
                                        $project: {
                                            firstName: 1,
                                            lastName: 1,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            $unwind: {
                                path: "$employeeId",
                            },
                        },
                        {
                            $project: {
                                text: 1,
                                status: 1,
                                createdAt: 1,
                                employeeFirstName: "$employeeId.firstName",
                                employeeLastName: "$employeeId.lastName",
                                employeeId: "$employeeId._id",
                            },
                        },
                    ],
                },
            },
            {
                $unwind: {
                    path: "$employeeId",
                },
            },
            {
                $project: {
                    postOwnerFirstName: "$employeeId.firstName",
                    postOwnerLastName: "$employeeId.lastName",
                    title: 1,
                    cover: 1,
                    like: 1,
                    comment: 1,
                    status: 1,
                    createdAt: 1,
                    totalComment: {
                        $size: "$comment",
                    },
                    totalLike: {
                        $size: "$like",
                    },
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
        ];
        const postDetails = await blogModel.aggregate(query);
        return postDetails;
    }
};

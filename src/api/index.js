const express = require("express");
const router = express.Router();

router.use("/employee", require("./employee/employee.route"));
router.use("/auth", require("./auth/auth.route"));
router.use("/userRole",require('./userRole/userRole.route'));
router.use("/region",require('./region/region.route'));
router.use("/leave", require('./leaves/leave.route'));
router.use('/task',require('./task/task.route'));
router.use('/ticket',require('./ticket/ticket.route'));
router.use('/like',require('./like/like.route'));
router.use('/setting',require('./setting/setting.route'));
router.use("/comment", require("./comment/comment.route"));
router.use("/blog", require("./blog/blog.route"));
router.use("/project", require("./project/project.route"));
router.use("/activity", require("./activity/activity.route"));

module.exports = router;

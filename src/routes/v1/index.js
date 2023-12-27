const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    res.send("<img src='uploads/abc.jpg' alt='img' />")
});

router.use("/api", require("../../api"));


module.exports = router;
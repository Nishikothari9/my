const express = require("express");
const blogController = require("./blog.controller");
const blogValidator = require("./blog.validation");
const router = express.Router();

const multer = require("multer");
 const storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, "src/public/uploads/");
     },
     filename: (req, file, cb) => {
         cb(
             null,
             new Date().toISOString().replace(/:/g, "-") +
                 "-" +
                 file.originalname
         );
     },
 });
 const upload = multer({ storage: storage });


//  ADD NEW POST
router.post(
    "/add",
    upload.single('photo'),
    blogController.addPost
);
// GET ALL POST (:id = "employee id")
router.get("/getAllPost/:id",blogController.getAllPost)

// GET SINGLE POST DETAILS BY ID
router.get("/getPostDetail/:id", blogController.getPostDetail);

module.exports = router;

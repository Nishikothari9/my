const express = require("express");
const projectController = require("./project.controller");
const projectValidation = require("./project.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/project/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.array("attachment[]"),validate(projectValidation.addProject), projectController.addNewProject);

router.post(
  "/update/:id",
  upload.array("attachment[]"),
  projectController.updateProject
);

router.get("/getAllProject", projectController.getAllProject);
router.get("/getMyAllTicket/:id", projectController.getMyAllProject);
router.delete("/delete/:id", projectController.deleteProject);
router.get("/getProject/:id", projectController.getProject);

module.exports = router;

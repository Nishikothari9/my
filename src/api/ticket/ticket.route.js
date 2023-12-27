const express = require("express");
const ticketController = require("./ticket.controller");
const ticketValidation = require("./ticket.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/ticket/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.array("attachment[]"), ticketController.addTicket);

router.post(
  "/update/:id",
  upload.array("attachment[]"),
  ticketController.updateTicket
);

router.get("/getAllTicket", ticketController.getAllTicket);
router.get("/getMyAllTicket/:id", ticketController.getMyAllTicket);
router.delete("/delete/:id", ticketController.deleteTicket);
router.get("/getTicket/:id", ticketController.getTicket);

module.exports = router;

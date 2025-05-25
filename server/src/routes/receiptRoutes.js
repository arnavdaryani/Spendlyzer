const express = require("express");
const multer = require("multer");
const {
  uploadReceipt,
  getReceipts,
  getReceiptById,
  deleteReceipt
} = require("../controllers/receiptController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("image"), uploadReceipt);
router.get("/", getReceipts);
router.get("/:id", getReceiptById);
router.delete("/:id", deleteReceipt);

module.exports = router;
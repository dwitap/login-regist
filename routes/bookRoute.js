const express = require("express");
const bookController = require("../controllers/bookController.js");
const {
  verifyAdmin,
  verifyToken,
} = require("../minddlewares/authMiddleware.js");
const router = express.Router();

router.get("/", bookController.showAllBook);
router.get("/:id", bookController.detailBookByPk);
router.post("/", verifyToken, verifyAdmin, bookController.addNewBook);
router.patch("/:id", verifyToken, verifyAdmin, bookController.updateBook);
router.delete("/:id", verifyToken, verifyAdmin, bookController.deleteBookById);

module.exports = router;

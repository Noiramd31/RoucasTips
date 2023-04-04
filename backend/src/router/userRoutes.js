const express = require("express");

const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "public/uploads" });

const userControllers = require("../controllers/userControllers");

router.get("/", userControllers.browse);
router.get("/:id", userControllers.read);
router.put("/:id", upload.single("avatar"), userControllers.edit);
router.post("/", upload.single("avatar"), userControllers.add);
router.delete("/:id", userControllers.destroy);

module.exports = router;

const express = require("express");

const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "public/uploads" });

const placeControllers = require("../controllers/placeControllers");

router.get("/", placeControllers.browse);
router.get("/:id", placeControllers.read);
router.put("/:id", upload.single("picture"), placeControllers.edit);
router.post("/", upload.single("picture"), placeControllers.add);
router.delete("/:id", placeControllers.destroy);

module.exports = router;

const express = require("express");

const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "public/uploads" });

const cityControllers = require("../controllers/cityControllers");

router.get("/", cityControllers.browse);
router.get("/:id", cityControllers.read);
router.put("/:id", upload.single("picture"), cityControllers.edit);
router.post("/", upload.single("picture"), cityControllers.add);
router.delete("/:id", cityControllers.destroy);

module.exports = router;

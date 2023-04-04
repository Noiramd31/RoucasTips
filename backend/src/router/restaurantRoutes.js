const express = require("express");

const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "public/uploads" });

const restaurantControllers = require("../controllers/restaurantControllers");

router.get("/", restaurantControllers.browse);
router.get("/:id", restaurantControllers.read);
router.put("/:id", upload.single("picture"), restaurantControllers.edit);
router.post("/", upload.single("picture"), restaurantControllers.add);
router.delete("/:id", restaurantControllers.destroy);

module.exports = router;

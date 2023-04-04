const express = require("express");
const cityRoutes = require("./cityRoutes");
const placeRoutes = require("./placeRoutes");
const restaurantRoutes = require("./restaurantRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/city", cityRoutes);
router.use("/place", placeRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;

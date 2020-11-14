const router = require("express").Router();
const trailRoutes = require("./trails");
const weatherRoutes = require("./weatherAPI");
const directionsRoutes = require("./directionsAPI");

// Trail routes
router.use("/trails", trailRoutes);
router.use("/weather", weatherRoutes);
router.use("/directions", directionsRoutes);

module.exports = router;

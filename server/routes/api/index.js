const router = require("express").Router();
const trailRoutes = require("./trails");
const weatherRoutes = require("./weatherAPI");
const directionsRoutes = require("./directionsAPI");
const mapSearchRoutes = require("./mapSearchAPI");

// Trail routes
router.use("/trails", trailRoutes);
router.use("/weather", weatherRoutes);
router.use("/directions", directionsRoutes);
router.use("/mapSearch", mapSearchRoutes);

module.exports = router;

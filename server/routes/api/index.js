const router = require("express").Router();
const trailRoutes = require("./trails");
const weatherRoutes = require("./weatherAPI");
const directionsRoutes = require("./directionsAPI");
const mapSearchRoutes = require("./mapSearchAPI");
const geocodeRoutes = require("./geocodeAPI");
const googleKeyRoutes = require("./googleMapKey");

// Trail routes
router.use("/trails", trailRoutes);
router.use("/weather", weatherRoutes);
router.use("/directions", directionsRoutes);
router.use("/mapSearch", mapSearchRoutes);
router.use("/geocode", geocodeRoutes);
router.use("/key", googleKeyRoutes);

module.exports = router;

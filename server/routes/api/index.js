const router = require("express").Router();
const trailRoutes = require("./trails");
const weatherRoutes = require("./weatherAPI");
const mapSearchRoutes = require("./mapSearchAPI");
const streetviewRoutes = require("./streetviewAPI");
const geocodeRoutes = require("./geocodeAPI");
const googleKeyRoutes = require("./googleMapKey");
const distanceRoutes = require("./distance")

// Trail routes
router.use("/trails", trailRoutes);
router.use("/weather", weatherRoutes);
router.use("/mapSearch", mapSearchRoutes);
router.use("/streetview", streetviewRoutes);
router.use("/geocode", geocodeRoutes);
router.use("/key", googleKeyRoutes);
router.use("/distance", distanceRoutes);

module.exports = router;

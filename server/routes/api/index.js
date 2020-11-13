const router = require("express").Router();
const trailRoutes = require("./trails");

// Trail routes
router.use("/trails", trailRoutes);

module.exports = router;

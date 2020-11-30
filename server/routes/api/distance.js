const router = require('express').Router();
const getDistance = require("../../services/haversineDistance");

router.post('/', async function(req, res) {
  console.log("------------req.body-------------", req.body);
  const { origin, waypoints, trailType, destination } = req.body;
  let totalLength = 0;

  totalLength += getDistance([origin.lat, origin.lng], [waypoints[0].lat, waypoints[0].lng]);

  for (let i = 0; i < waypoints.length - 1; i++) {
    totalLength += getDistance([waypoints[i].lat, waypoints[i].lng], [waypoints[i +1].lat, waypoints[i +1].lng])
  }

  switch (trailType) {
    case "A to B": 
      totalLength += getDistance([waypoints[waypoints.length - 1].lat, waypoints[waypoints.length - 1].lng], [destination.lat, destination.lng]);
      break;
    case "Loop":
      totalLength += getDistance([waypoints[waypoints.length - 1].lat, waypoints[waypoints.length - 1].lng], [origin.lat, origin.lng]);
      break;
    case "Out 'n Back":
      totalLength = totalLength*2;
      break;
  }

  res.json({totalLength});
  
})

module.exports = router;
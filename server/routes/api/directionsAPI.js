const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/:origin/:destination/:waypoints', async (req, res) => {
  const origin = req.params.origin;
  const destination = req.params.destination;
  let waypoints = [];

  const key = process.env.REACT_APP_GOOGLE_MAPS_API;

  let url = `https://maps.google.com/maps/embed/v1/directions?origin=${origin}&destination=${destination}&mode=walking&maptype=satellite&key=${key}`;

  if(req.params.waypoints) {
    waypoints = req.params.waypoints.split('+');
    url += `&waypoints=`;
    for(i = 0; i < waypoints.length - 1; i++) {
      url += `${waypoints[i]}|`;
    }
    url += `${waypoints[waypoints.length - 1]}`;
   }

  res.json(url);
});

module.exports = router;
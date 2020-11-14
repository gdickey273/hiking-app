const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/:origin/:waypoints/:destination', async (req, res) => {
  const origin = req.params.origin;
  const waypoints = req.params.waypoints;
  const destination = req.params.destination;

  const key = process.env.REACT_APP_GOOGLE_MAPS_API;

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=via:${waypoints}&mode=walking&key=${key}`;

  const maps_response = await fetch(url);
  const maps_data = await maps_response.json();

  res.json(maps_data);
});

module.exports = router;
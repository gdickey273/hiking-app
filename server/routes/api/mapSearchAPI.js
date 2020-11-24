const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/:origin', async (req, res) => {
  // const trailName = req.params.trailName;
  const origin = req.params.origin;

  const key = process.env.REACT_APP_GOOGLE_MAPS_API;

  let url = `https://www.google.com/maps/embed/v1/view?key=${key}&zoom=17&center=${origin}`;

  res.send(url);
});

module.exports = router;
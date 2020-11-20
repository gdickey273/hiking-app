const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/:trailName', async (req, res) => {
  const trailName = req.params.trailName;
  console.log(trailName);

  const key = process.env.REACT_APP_GOOGLE_MAPS_API;

  let url = `https://www.google.com/maps/embed/v1/search?key=${key}&q=${trailName}`;

  res.send(url);
});

module.exports = router;
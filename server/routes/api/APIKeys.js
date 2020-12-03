const router = require('express').Router();

router.get('/', async (req, res) => {

  const keys = {
    google: process.env.REACT_APP_GOOGLE_MAPS_API,
    weather: process.env.REACT_APP_API_KEY
  };

  res.send(keys);
});

module.exports = router;
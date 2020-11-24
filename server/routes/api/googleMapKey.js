const router = require('express').Router();

router.get('/', async (req, res) => {

  const key = process.env.REACT_APP_GOOGLE_MAPS_API;

  res.send(key);
});

module.exports = router;
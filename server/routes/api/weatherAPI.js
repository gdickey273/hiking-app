const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/:latlon', async (req, res) => {
  const latlon = req.params.latlon.split(',');
  const lat = latlon[0];
  const lon = latlon[1];

  const key = process.env.REACT_APP_WEATHER_API;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;

  const weather_response = await fetch(url);
  const weather_data = await weather_response.json();

  res.json(weather_data);
});

module.exports = router;

// FRONT END EXAMPLE
// let lat, lon;
// if ('geolocation' in navigator) {
//   console.log('geolocation available');
//   navigator.geolocation.getCurrentPosition(async position => {
//     let lat, lon, weather;
//     try {
//       lat = position.coords.latitude;
//       lon = position.coords.longitude;
//       const api_url = `weather/${lat},${lon}`;
//       const response = await fetch(api_url);
//       const json = await response.json();
//     } catch (error) {
//       console.error(error);
//     }

//     const data = { lat, lon };
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     };
//     const db_response = await fetch('/api', options);
//     const db_json = await db_response.json();
//     console.log(db_json);
//   });
// } else {
//   console.log('geolocation not available');
// }
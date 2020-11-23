import axios from "axios";

export default {
  // Gets weather data with passed coordinates
  getWeather: function(lat, lon) {
    return axios.get(`/api/weather/${lat},${lon}`);
  },
  getTrailMap: function(origin) {
    return axios.get(`/api/mapSearch/${origin}`);
  },
  getCoordinates: function(city, state) {
    return axios.get(`/api/geocode/${city}/${state}`);
  },
  getGoogleKey: function() {
    return axios.get(`/api/key/`);
  }
}; 
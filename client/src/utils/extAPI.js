import axios from "axios";

export default {
  // Gets weather data with passed coordinates
  getWeather: function(lat, lon) {
    return axios.get(`/api/weather/${lat},${lon}`);
  },
  // Get map url for user added routes with passed coordinates, waypoints should be separated with +
  getRoutedMap: function(origin, destination, waypoints) {
    return axios.get(`/api/directions/${origin}/${waypoints}/${destination}`);
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
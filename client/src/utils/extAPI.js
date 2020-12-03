import axios from "axios";

export default {
  // Gets weather data with passed coordinates
  getWeather: function (lat, lon) {
    return axios.get(`/api/weather/${lat},${lon}`);
  },
  getTrailMap: function (origin) {
    return axios.get(`/api/mapSearch/${origin}`);
  },
  getStreetview: function (origin) {
    return axios.get(`/api/streetview/${origin}`);
  },
  getCoordinates: function (city, state) {
    return axios.get(`/api/geocode/${city}/${state}`);
  },
  getAPIKeys: function () {
    return axios.get(`/api/key/`);
  },
  getTrailDistance: function (origin, waypoints, trailType, destination) {
    return axios({
        method: "post",
        url: "/api/distance",
        data: {
          origin,
          waypoints,
          trailType,
          destination
        }
      })
  },
  uploadImage: function (image) {
    return axios.post('/api/image-uploads', image);
  }
}; 
import axios from "axios";

export default {
  // Gets all trails
  getTrails: function() {
    return axios.get("/api/trails");
  },
  // Gets the trail with the given id
  getTrail: function(id) {
    return axios.get("/api/trails/" + id);
  },
  getTrailsWithinRadius: function(center, radius) {
    return axios.get(`/api/trails/radius/${center.lat}/${center.lng}/${radius}`);
  },
  // Deletes the trail with the given id
  deleteTrail: function(id) {
    return axios.delete("/api/trails/" + id);
  },
  // Saves a trail to the database
  saveTrail: function(trailData) {
    return axios.post("/api/trails", trailData);
  }
};
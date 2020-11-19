const haversine = require("haversine");
const { get } = require("mongoose");

const getDistance = function(coordA, coordB) {
  return haversine(coordA, coordB, { unit: "mile" });
}

module.exports = getDistance;

// const getDistance = require("./services/haversineDistance");
// let dist = getDistance({lat:36.0959715, lng:-79.2669619 }, {lat:36.0956918, lng:-79.43779909999999});

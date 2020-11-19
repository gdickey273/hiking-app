const haversine = require("haversine");
const { get } = require("mongoose");

const getDistance = function(coordA, coordB) {
  return haversine(coordA, coordB, { unit: "mile" });
}

module.exports = getDistance;

// const getDistance = require("./services/haversineDistance");
// let dist = getDistance({latitude:36.0959715, longitude:-79.2669619 }, {latitude:36.0956918, longitude:-79.43779909999999});

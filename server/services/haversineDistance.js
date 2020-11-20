const haversine = require("haversine");
const { get } = require("mongoose");

//accepts two sets of coordinates (each as two element arrays i.e. [36.0956918,-79.43779909999999]) and returns the distance between them in miles
const getDistance = function(coordA, coordB) {
  return haversine(coordA, coordB, { unit: "mile", format: "[lat,lon]" });
}

module.exports = getDistance;

// const getDistance = require("./services/haversineDistance");
// let dist = getDistance([36.0959715,-79.2669619 ], [36.0956918,-79.43779909999999]);
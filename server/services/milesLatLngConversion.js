const earthRadius = 3960.0;
const degreesToRadians = Math.PI / 180.0;
const radiansToDegrees = 180.0 / Math.PI;

module.exports = {
  getLatBounds = function (lat, miles) {
    let radius = (miles / earthRadius) * radiansToDegrees;
    return [lat - radius, lat + radius];
  },
  getLngBounds = function (lng, miles) {
    let radius = (miles / earthRadius) * radiansToDegrees;
    return [lng - radius, lng + radius];
  }
}
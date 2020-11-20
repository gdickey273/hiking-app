let mongoose = require("mongoose");
let db = require("../models");
let APIData = require("../data/seedHikingData.json");
let userData = require("../data/seedUserHikingData.json");
const { User } = require("../models");

mongoose.connect("mongodb://localhost/hiking-app", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let trailSeed = [];

for(i = 0; i < APIData.trails.length; i++) {
  trailSeed.push({
    name: APIData.trails[i].name,
    date: APIData.trails[i].conditionDate,
    city: APIData.trails[i].location.split(',')[0],
    state: APIData.trails[i].location.split(',')[1],
    originLat: APIData.trails[i].latitude,
    originLng: APIData.trails[i].longitude,
    rating: APIData.trails[i].stars,
    comments: [APIData.trails[i].summary],
    photos: [APIData.trails[i].imgMedium],
    length: APIData.trails[i].length,
    elevation: {
      ascent: APIData.trails[i].ascent,
      descent: APIData.trails[i].descent
    },
    duration: null,
    trailType: null,
    terrain: null,
    currentCondition: APIData.trails[i].conditionDetails,
    trafficLevels: null,
    waterSources: null
  })
}

for(i = 0; i < userData.UserHikingData.length; i++) {

  const latLngArr = userData.UserHikingData[i].origin.split(",");
  const lat = parseFloat(latLngArr[0]);
  const lng = parseFloat(latLngArr[1]);
  trailSeed.push({
    name: userData.UserHikingData[i].name,
    date: userData.UserHikingData[i].conditionDate,
    city: userData.UserHikingData[i].city,
    state: userData.UserHikingData[i].state,
    originLat: lat,
    originLng: lng,
    destination: userData.UserHikingData[i].destination,
    rating: userData.UserHikingData[i].stars,
    comments: [userData.UserHikingData[i].comments],
    photos: null,
    length: userData.UserHikingData[i].length,
    elevation: userData.UserHikingData[i].elevation,
    duration: userData.UserHikingData[i].duration,
    trailType: userData.UserHikingData[i].trailType,
    terrain: userData.UserHikingData[i].terrain,
    currentCondition: null,
    trafficLevels: null,
    waterSources: null
  })
}

db.Trail.deleteMany({})
  .then(() => db.Trail.collection.insertMany(trailSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
let mongoose = require("mongoose");
let db = require("../models");
let APIData = require("../data/seedHikingData.json");
let userData = require("../data/seedUserHikingData.json");
const { User } = require("../models");
const fs = require("fs");

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
    rateCount: APIData.trails[i].starVotes,
    comments: [{comment: APIData.trails[i].summary, userName: "Anonymous", userID: null}],
    photos: [APIData.trails[i].imgMedium],
    length: APIData.trails[i].length,
    elevation: [APIData.trails[i].ascent, APIData.trails[i].descent],
    currentCondition: APIData.trails[i].conditionDetails,
    isPolylinePath: 0
  })
}

for(i = 0; i < userData.UserHikingData.length; i++) {

  const latLngArr = userData.UserHikingData[i].origin.split(",");
  const lat = parseFloat(latLngArr[0]);
  const lng = parseFloat(latLngArr[1]);
  trailSeed.push({
    name: userData.UserHikingData[i].name,
    date: userData.UserHikingData[i].date,
    city: userData.UserHikingData[i].city,
    state: userData.UserHikingData[i].state,
    originLat: lat,
    originLng: lng,
    destination: userData.UserHikingData[i].destination,
    waypoints: userData.UserHikingData[i].waypoints,
    rating: userData.UserHikingData[i].rating,
    rateCount: 1,
    comments: [{comment: userData.UserHikingData[i].comments, userName: "Anonymus", userID: null}],
    length: userData.UserHikingData[i].length,
    elevation: userData.UserHikingData[i].elevation,
    duration: userData.UserHikingData[i].duration,
    trailType: userData.UserHikingData[i].trailType,
    terrain: userData.UserHikingData[i].terrain
  })
}

function seedLocalDB(){
  mongoose.connect("mongodb://localhost/hiking-app", {
  useNewUrlParser: true,
  useFindAndModify: false
});

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
}

//creates a JSON file named seed.json for seeding Mongodb Atlas database for Heroku.
// mongoimport --uri "mongodb+srv://gdickey273:<PASSWORD>@cluster0.a2fqy.mongodb.net/hiking-app?retryWrites=true&w=majority" --collection trails --drop --file seed.json --jsonArray
function writeJSONSeedFile() {
  fs.writeFile("seed.json", JSON.stringify(trailSeed), (err) => {if(err) throw err; console.log('file saved!')});
}

seedLocalDB();
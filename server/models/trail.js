const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trailSchema = new Schema({
  name: { type: String, required: true },
  length: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Trail = mongoose.model("Trail", trailSchema);

module.exports = Trail;

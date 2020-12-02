const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trailSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	originLat: {
		type: Number,
		required: false,
		default: null
	},
	originLng: {
		type: Number,
		required: false,
		default: null
	},
	destination: {
		type: String,
		required: false,
		default: null
	},
	waypoints: {
		type: Array,
		required: false,
		default: null
	},
	rating: {
		type: Number,
		required: true
	},
	rateCount: {
		type: Number,
		required: false,
		default: 0
	},
	comments: {
		type: Array,
		required: true
	},
	photos: {
		type: Array,
		required: false,
		default: []
	},
	userVerified: {
		type: Number,
		required: false,
		default: 0
	},
	length: {
		type: Number,
		required: true
	},
	elevation: {
		type: Array,
		required: false,
		default: []
	},
	duration: {
		type: Number,
		required: false,
		default: 0
	},
	trailType: {
		type: String,
		required: false,
		default: "Not available"
	},
	terrain: {
		type: String,
		required: false,
		default: "Not available"
	},
	currentCondition: {
		type: String,
		required: false,
		default: 'None Available'
	},
	trafficLevels: {
		type: String,
		required: false,
		default: 'No information available'
	},
	waterSources: {
		type: String,
		required: false,
		default: 'No information available'
	},
	isPolylinePath: {
		type: Number,
		required: true,
		default: 0
	}
});

const Trail = mongoose.model('Trail', trailSchema);

module.exports = Trail;

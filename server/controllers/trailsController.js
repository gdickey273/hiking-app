const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');
const bounds = require("../services/milesLatLngConversion");
const getDistance = require("../services/haversineDistance");

// Defining methods for the booksController
module.exports = {
	findAll: function (req, res) {
		db.Trail
			.find({})
			.then(trailData => {
				res.json({ trails: trailData });
			})
			.catch(err => res.status(422).json(err));
	},

	findUserFavorites: function (req, res) {
		if (req.user) {
			db.User
				.find({ _id: req.user._id })
				.populate({ path: 'favorites',
				model: 'Trail', options: { sort: { date: -1 } } })
				.then(users => {
					res.json({ favorites: users[0].favorites });
				})
				.catch(err => res.status(422).json(err));
		} else {
			return res.json({ favorites: null });
		}
	},
	findById: function (req, res) {
		db.Trail
		.findOne({_id : req.params.id})
		.then(trail => {
			res.json(trail)
		})
		.catch(err => res.status(422).json(err));
	},
	findWithinRadius: function (req, res) {
		const lat = parseFloat(req.params.lat);
		const lng = parseFloat(req.params.lng);
		const radius = parseInt(req.params.radius);
		
		
		console.log(`-------center: ${lat}, ${lng} ----- radius: ${radius}-----------`);
		const [latMin, latMax] = bounds.getLatBounds(lat, radius);
		const [lngMin, lngMax] = bounds.getLngBounds(lng, radius);

		console.log(`-------------latMin, latMax, lngMin, lngMax: ${latMin}, ${latMax}, ${lngMin}, ${lngMax},`)

		db.Trail
			.find({ 
				$and: [
					{originLat: { $exists: true } },
					{originLat: { $gt: latMin } },
					{originLat: { $lt: latMax } },
					{originLng: { $gt: lngMin } },
					{originLng: { $lt: lngMax } }
				]
			})
			.then( trails => {
				const withinBounds = [];
				trails.forEach(t => {
					const distance = getDistance([lat, lng], [t.originLat, t.originLng]);
					if (distance <= radius){
						withinBounds.push({trail: t, distanceFromCenter: distance});
					}
				});
				// filter( t => getDistance([center.lat, center.lng], [t.originLat, t.originLng]) <= radius)
				withinBounds.sort((a, b) => a.distanceFromCenter - b.distanceFromCenter);
				res.json({data: withinBounds});
			})
			.catch(err => res.json(err));
	},
	create: function (req, res) {
		console.log('user id!', req.user._id);
		db.Trail
			.create(req.body)
			.then(dbTrail => {
				console.log('dbTrail', dbTrail)
				return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { favorites : dbTrail._id } }, { new: true });
			})
			.then((dbUser) => {
				console.log('dbUser', dbUser);
				// If the User was updated successfully, send it back to the client
				res.json(dbUser);
			})
			.catch(err => res.status(422).json(err));
	},
	update: function (req, res) {
		db.Trail
			.findOneAndUpdate({ _id: req.params.id }, req.body.trailData, { new: true })
			.then(dbModel => {
				res.json(dbModel);
			})
			.catch(err => res.status(422).json(err));
	},
	addFavorite: function (req, res) {
		console.log('user id!', req.user._id);
		console.log('body!', req.body);
		db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { favorites : req.body.trailID } }, { new: true })
			.then((dbUser) => {
				console.log('dbUser', dbUser);
				// If the User was updated successfully, send it back to the client
				res.json(dbUser);
			})
			.catch(err => res.status(422).json(err));
	},
	remove: function (req, res) {
		db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: { trails: new ObjectId(req.params.id) } }, { new: true })
			.then(() => {
				db.Trail
					.findOneAndDelete({ _id: req.params.id })
					.then(dbTrail => res.json(dbTrail))
					.catch(err => res.status(422).json(err));
			});
	}
};

const ObjectId = require('mongoose').Types.ObjectId;
const db = require('../models');

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

	findAllByUser: function (req, res) {
		if (req.user) {
			db.User
				.find({ _id: req.user._id })
				.populate({ path: 'trails', options: { sort: { date: -1 } } })
				.then(users => {
					res.json({ trails: users[0].trails });
				})
				.catch(err => res.status(422).json(err));
		} else {
			return res.json({ trails: null });
		}
	},
	findById: function (req, res) {
		db.Trail
		.findOne({_id : req.params._id})
		.then( trail => {
			res.json(trail);
		})
		.catch(err => res.status(422).json(err));
	},
	create: function (req, res) {
		console.log('user id!', req.user._id);
		db.Trail
			.create(req.body)
			.then(dbTrail => {
				console.log('dbTrail', dbTrail)
				return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { trails : dbTrail._id } }, { new: true });
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
			.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(dbModel => {
				console.log(dbModel);
				res.json(dbModel);
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

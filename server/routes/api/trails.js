const router = require('express').Router();
const trailsController = require('../../controllers/trailsController');

// Matches with "/api/trails"
router.route('/')
	.get(trailsController.findAll)
	.post(trailsController.create);

// Matches with "/api/trails/radius"
router
	.route('/radius/:lat/:lng/:radius')
	.get(trailsController.findWithinRadius);

// Matches with "/api/trails/:id"
router
	.route('/:id')
	.get(trailsController.findById)
	.put(trailsController.update)
	.delete(trailsController.remove);

// Matches with "/api/trails/user/:userID"
router 
	.route('/user/:userID')
	.get(trailsController.findUserFavorites)
	.put(trailsController.addFavorite);

module.exports = router;

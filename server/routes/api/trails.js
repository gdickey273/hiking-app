const router = require('express').Router();
const trailsController = require('../../controllers/trailsController');

// Matches with "/api/trails"
router.route('/')
	.get(trailsController.findAll)
	.post(trailsController.create);

// Matches with "/api/trails/:id"
router
	.route('/:id')
	.get(trailsController.findById)
	.put(trailsController.update)
	.delete(trailsController.remove);

// Matches with "/api/trails/user/:userID"
router 
	.route('/user/:userID')
	.get(trailsController.findAllByUser);

router
	.route('/radius')
	.get(trailsController.findWithinRadius);

module.exports = router;

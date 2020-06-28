const { Router } = require('express');
const controller = require('../controllers/basemap');
const passport = require('passport');

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getBasemaps);
router.post('/', passport.authenticate('jwt', { session: false }), controller.addBasemap);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteBasemap);
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.updateBasemap);

module.exports = router;
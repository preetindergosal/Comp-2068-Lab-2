const router = require('express').Router();

// controllers
const MoviesController = require('../controllers/moviesController');

// routes
router.get(`/new`, MoviesController.new);
router.get(`/drafts`, MoviesController.drafts);
router.get(`/published`, MoviesController.published);
router.get(`/`, MoviesController.index);
router.get(`/:id`, MoviesController.show);
router.post(`/`, MoviesController.create);
router.get(`/:id/edit`, MoviesController.edit);
router.post(`/update`, MoviesController.update);
router.post(`/destroy`, MoviesController.destroy);

module.exports = router;
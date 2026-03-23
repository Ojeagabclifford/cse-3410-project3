const routes = require('express').Router();
const moviesController = require('../controllers/moviesContollers');
const validator = require('../middleware/validation');

routes.get('/', moviesController.getMovies);
routes.post('/', validator.saveMovie, moviesController.createMovie);
routes.put('/:id', validator.saveMovie, moviesController.updateMovie);
routes.delete('/:id', moviesController.deleteMovie);



module.exports = routes;
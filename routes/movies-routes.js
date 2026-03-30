const routes = require('express').Router();
const moviesController = require('../controllers/moviesContollers');
const validator = require('../middleware/validation');
const authenticated = require('../middleware/authenticate')

routes.get('/', moviesController.getMovies);
routes.get('/:id', moviesController.getOneMovie)
routes.post('/',authenticated.isAuthenticated, validator.saveMovie, moviesController.createMovie);
routes.put('/:id', authenticated.isAuthenticated, validator.saveMovie, moviesController.updateMovie);
routes.delete('/:id', authenticated.isAuthenticated, moviesController.deleteMovie);



module.exports = routes;
const routes = require('express').Router();
const directorController = require('../controllers/directorController');
const validator = require('../middleware/validation');
const authenticated = require('../middleware/authenticate')

routes.get('/', directorController.getDirectors);
routes.get('/:id', directorController.getOneDirector);
routes.post('/', authenticated.isAuthenticated, validator.saveDirector, directorController.createDirector);
routes.put('/:id',authenticated.isAuthenticated, validator.saveDirector,directorController.updateDirector);
routes.delete('/:id', authenticated.isAuthenticated, directorController.deleteDirector);   


module.exports = routes;
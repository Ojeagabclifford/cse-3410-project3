const routes = require('express').Router();
const directorController = require('../controllers/directorController');
const validator = require('../middleware/validation');

routes.get('/', directorController.getDirectors);
routes.post('/', validator.saveDirector, directorController.createDirector);
routes.put('/:id', validator.saveDirector,directorController.updateDirector);
routes.delete('/:id', directorController.deleteDirector);   


module.exports = routes;
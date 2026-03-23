const routes = require('express').Router();
const directorRoutes = require('./director-routes');
const moviesRoutes = require('./movies-routes');

routes.use('/directors', directorRoutes);  
routes.use('/movies', moviesRoutes); 

// routes.use('/', );
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'api-docs',
    };
    res.send(docData);
  })
);

module.exports = routes;
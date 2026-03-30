const routes = require('express').Router();
const directorRoutes = require('./director-routes');
const moviesRoutes = require('./movies-routes');
const passport = require('passport')

routes.use('/directors', directorRoutes);  
routes.use('/movies', moviesRoutes); 

routes.get('/login', passport.authenticate('github'));


routes.get('/logout',(req, res, next) =>{
  
      req.logout((err )=> {
        if(err)
        {
          return next(err)
        }
        res.redirect('/')

})
     
      })

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
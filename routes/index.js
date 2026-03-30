const routes = require('express').Router();
const directorRoutes = require('./director-routes');
const moviesRoutes = require('./movies-routes');
const passport = require('passport')

routes.use('/directors', directorRoutes);  
routes.use('/movies', moviesRoutes); 

routes.get('/login', passport.authenticate('github'), (req,res)=>{});


routes.get('/logout', (req, res, next) => {
  // 1. Tell Passport to log out
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    
    // 2. Destroy the Express session to clear req.session.user
    req.session.destroy((err) => {
      // 3. Redirect to home page
      res.redirect('/');
    });
  });
});

// routes.use('/', );




module.exports = routes;
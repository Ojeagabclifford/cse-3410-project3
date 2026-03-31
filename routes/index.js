const routes = require('express').Router();
const directorRoutes = require('./director-routes');
const moviesRoutes = require('./movies-routes');
const passport = require('passport')

routes.use('/directors', directorRoutes);  
routes.use('/movies', moviesRoutes); 

routes.get('/login', passport.authenticate('github'), (req,res)=>{});

// I use AI to clearlify this code there where no req.session destory before i was trying to logout i notice it did not work so i was try to find
//better way to see it work out
routes.get('/logout', (req, res, next) => {
  // 1. Tell Passport to log out
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  
    req.session.destroy((err) => {
      // 3. Redirect to home page
      res.redirect('/');
    });
  });
});

// routes.use('/', );




module.exports = routes;
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Force Google and Cloudflare DNS

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const mongodb = require('./config/db');
const mongodbI = require('connect-mongo')
const passport = require('passport');
const session = require('express-session')
const cors = require('cors');
const  Githubstrategy = require('passport-github2').Strategy;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// const passport = require('passport');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))
.use(passport.initialize())
.use(passport.session())

.use((req,res,next)=>{
  res.setHeader("Access-Controll-Allow-Origin","*")
   res.setHeader("Access-Controll-Allow-hearders","Orign")
    res.setHeader("Access-Controll-Allow-methods","Get,post")
  next();
  
})

.use(cors({methods:['GET', 'POST','DELETE','UPDATE','PUT','PATCH']}))
.use(cors({origin:"*"}))

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

passport.use(new Githubstrategy({
  clientID: process.env.GITHUB_CLINT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRECT,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken,refreshToken,profile,done)
{
  return done(null,profile);
}


)),

passport.serializeUser((user,done)=>
{
  done(null,user);

})


passport.deserializeUser((user,done)=>
{
  done(null,user);
  
})


app.get('/',(req,res)=>{
  res.send(req.session.user!== undefined ? `logged in as${req.session.user.displayName}` :"Login Out")
})

app.get('/github/callback', passport.authenticate('github',{
  failureRedirect: 'api-docs', session: false}),
  (req,res)=>{
    req.session.user =req.user;
    res.redirect('/');
  }
)

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database initialized successfully');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


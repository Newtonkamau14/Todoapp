require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/passport.config')
require('./config/database')

//Middleware
app.set('view engine','ejs')
app.use(expressLayouts);
app.set('layout','layouts/layout')
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(methodOverride('_method'));

//Passport config
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGOATLAS_URI, collectionName: 'sessions'}),
    cookie: { 
        maxAge: 1000 * 60 * 60 *  24
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//pass req.user to every single template EJS

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    //res.locals.error = req.flash("error");
    //res.locals.success = req.flash("success");
    next(); 
});




//Routes
app.use('',require('./routes/todo'))
app.use('',require('./routes/auth'))


//Logout
app.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/auth/login');
    });
  });

//Start server
app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`)
});

module.exports = app;
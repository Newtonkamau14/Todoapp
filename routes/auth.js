const express = require('express')
const passport = require('passport')
const router = express.Router()
require('./../config/passport.config')



function checkNotAuthenticated(req,res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

//Require controller modules
const authControllers = require('../controllers/authController')

router.get('/auth/login',checkNotAuthenticated,authControllers.getLoginPage)

router.get('/auth/register',checkNotAuthenticated,authControllers.getRegisterPage)

router.post('/auth/register',checkNotAuthenticated,authControllers.createUser)

router.post('/auth/login',checkNotAuthenticated,passport.authenticate('local',{ successRedirect:'/',failureRedirect:'/auth/login'}))



module.exports = router;
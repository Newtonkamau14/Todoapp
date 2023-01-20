const User = require('../models/user.model')

//Get Login page
exports.getLoginPage = (req,res) => {
    res.render('login',{
        title: "Login"
    })
};

//Get Register page
exports.getRegisterPage = (req,res) => {
    res.render('register',{
        title: "Register"
    })
};

//Register new user
exports.createUser = async (req,res) => {
    let user = new User({
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password
    });    
    try {
        user = await user.save();
        res.redirect('/auth/login'); 
    } 
    catch  {
        res.redirect('/auth/register');
    }
}


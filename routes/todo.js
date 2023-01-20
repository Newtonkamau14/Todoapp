const express = require('express')
const router = express.Router()
require('./../config/passport.config')

//Require controller modules
const todoControllers = require('../controllers/todoController')

//Check user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/auth/login')
}


router.get('/',checkAuthenticated,todoControllers.index);

router.post('/', todoControllers.insert);

router.get('/update/:id',todoControllers.getEditPage)

router.put('/update/:id', todoControllers.update);

router.delete('/delete/:id', todoControllers.delete);

router.get('/search', todoControllers.search);







module.exports = router;
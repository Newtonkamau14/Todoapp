const express = require('express')
const router = express.Router()


//Require controller modules
const todoControllers = require('../controllers/todoController')


router.get('/', todoControllers.index);

router.post('/', todoControllers.insert);

router.put('/update/:id', todoControllers.update);

router.delete('/delete/:id', todoControllers.delete);

router.get('/search', todoControllers.search);







module.exports = router;
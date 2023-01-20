const { default: mongoose } = require('mongoose');
const Todos = require('../models/todo.model')


//Get Homepage
exports.index = async (req,res) => {
    const todos = await Todos.find();
    res.render('index',{
        title: "Home",
        todos: todos
    })
};

//Add new todo
exports.insert = async (req,res) => {

    try {
        req.body.user = req.user.id;
        await Todos.create(req.body)
        res.redirect('/');
        
    } catch (error) {
        res.status(500).send(error)
    }
};

//Get Edit page
exports.getEditPage = async (req,res) => {
    const todo = await Todos.findById(req.params.id)
    res.render('edit',{
        title: 'Edit',
        todo: todo
    });
}


//Edit todo
exports.update = async (req,res) => {
   let todo
   try {
        todo = await Todos.findById(req.params.id)
        todo.todo = req.body.todo
        await todo.save();

        res.redirect('/');
   } catch (error) {
        if(book == null){
            res.redirect('/')
        }
        else {
            res.render('pages/edit',{
                title: "Edit Book",
                book: book
            })
        }
   }

};




//Delete todo
exports.delete = async (req,res) => {
    await Todos.findByIdAndDelete(req.params.id);
    res.redirect('/');
};




//Search todo
exports.search = (req,res) => {
    try {
        Todos.find({todo:{'$regex':req.query.search}},(err,todos)=>{
            if(err){
                console.log(err);
            }else{
                res.render('index',{
                    title:"Homepage",
                    todos: todos
                });
            }
        });
        }
         catch (error) {
            console.log(error);
        }
};
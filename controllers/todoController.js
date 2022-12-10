const Todos = require('../models/todo.model')


//Get Homepage
exports.index = async (req,res) => {
    const todos = await Todos.find()
    res.render('index',{
        title: "Homepage",
        todos: todos
    })
};

//Add new todo
exports.insert = async (req,res) => {
    let todo = new Todos({
        todo: req.body.todo
    });

    try {
        todo = await todo.save();
        res.redirect('/');
        
    } catch (error) {
        res.status(500).send(error)
    }
};


//Edit todo
exports.update = async (req,res) => {
   let todo
   try {
        todo = await Todos.findById(req.params.id)
        todo.todo = req.body.title
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
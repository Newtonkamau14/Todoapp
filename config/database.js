const mongoose = require('mongoose')


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOATLAS_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) => {
    if(!err){
        console.log('MongoDB Connection Succeeded');
    }
    else {
        console.log('Error in DB connection' + err);
    }
});
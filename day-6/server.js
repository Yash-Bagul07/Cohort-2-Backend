const app   = require('./src/app');

const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect("mongodb+srv://yashbagul100_db_user:Silentkiller0107@cluster0.1py20cu.mongodb.net/day-6")
    .then(()=>{
    console.log("Connected to DB"); 
    })
}

connectToDB();

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
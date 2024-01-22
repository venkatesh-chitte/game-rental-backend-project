const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect('mongodb+srv://venkateshchitte48:Venkatesh%401234@cluster0.vpksyld.mongodb.net/game_rental')
.then(()=>{
    console.log("server Started")
    app.listen(5001,()=>{
        console.log("server started on the port 5001")
    })
})
.catch((err)=>{
    console.log(err)
})


// ■ Explain what is Node, Express & Mongo and how they
// work together in details.
// ■ How did you connect Mongo to your node application?
// ■ What are events, event emitter and event loops??
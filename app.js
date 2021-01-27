const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const userRoutes = require('./routes/users'); 

const app = express();


app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeaders('Access-Control-Allow-Origin', '*');
    res.setHeaders('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
    res.setHeaders('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const mongoUrl = 'mongodb+srv://proengan:proengan@cluster0.hsjtr.mongodb.net/test?retryWrites=true&w=majority&ssl=true';
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};


app.use('/api/users', userRoutes);




mongoose.connect(mongoUrl, mongooseOptions)
.then( () => {
    console.log('connected to database');
    // app.listen(8080); 
}).catch(err => console.log(err));

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);



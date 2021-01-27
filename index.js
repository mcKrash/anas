const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const  cors = require('cors')

const userRoutes = require('./routes/users'); 

const port = (process.env.PORT || 5000);

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
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


app.listen(port, () => {
    console.log(`listening to port ${port} `);
});



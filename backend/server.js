// Import Express
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const UserRoutes = require('./routes/UserRoutes.js');
// const ProductRoutes = require('./routes/ProductRoutes.js');
// const initPassportStrategy = require('./passport-config.js');

//Invoke Express and assign to 'Server'
const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
//Configure express to use passport
server.use(passport.initialize());
// Configure passport to use JWT
// initPassportStrategy(passport);

server.use(express.static('TeQuest'));

const dbString = "mongodb+srv://admin:sak43usd@cluster0.qks5s.mongodb.net/<dbname>?retryWrites=true&w=majority";

//Calling on Mongoose to connect to the database using the username and password stored in the dbString variable
// Pass is sak43usd
mongoose
.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true})
.then(
    () => {
    console.log('db is connected')
    }
)
.catch(
    (error) => {
        console.log('db NOT connected. an error occured', error)
    }
)

server.get(
    '/',
    (req,res)=>{
        //Pushing the home page which is one folder up from the contents of the backend folder
        res.sendFile(path.join(__dirname) + "/index.html");
    }
);

server.get(
    '/serviceproviders',
    (req,res) => {
        //Push the service provider page to the '/serviceprooviders' route.
        res.sendFile(path.join(__dirname) + "/serviceprovider.html");
    }
);


server.listen(
    8080,
    (req,res) => {
        console.log("server is listening on port 8080");
    }
)


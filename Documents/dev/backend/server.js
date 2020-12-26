//Import main express file as a function
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressFormData = require('express-form-data');
const UserRoutes = require('./routes/UserRoutes.js');
const ProductRoutes = require('./routes/ProductRoutes.js');
const initPassportStrategy = require('./passport-config.js');
require('dotenv').config();

//Invoke express
const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));


//Configure express to ready body of http request
server.use(bodyParser.json());

//Configure express to read file attachements
server.use(expressFormData.parse());

//Configure express to use passport
server.use(passport.initialize());
// Configure passport to use JWT
initPassportStrategy(passport);

//Confiure cloudinary
cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
);

const dbString = process.env.DB_URL;

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


//Database Password
// iaTm0mF93

server.get(
    '/',
    (req,res) => {
        res.send("<h1> Welcome to Home </h1>")
    }
);

//Users Route
server.use(
    '/users',
    UserRoutes
);

//Sample Routes
server.get(
    '/about',
    (req,res) => {
        res.send("<h1>About</h1>")
    }
);

server.get(
    '/contact',
    (req,res) => {
        res.send("<h1>Contact Us</h1>")
    }  
);

server.get(
    '/privacy-policy',
    (req,res) =>{
        res.send("<h1>Privacy Policy</h1>")
    }
);

// Product Routes
server.use(
    '/products',
    passport.authenticate('jwt',{session: false}),
    ProductRoutes
);


//Route that retrieves something from the database.



server.get(
    '*',
    (req,res) =>{
        res.send("<h1>404</h1>")
    }
);

server.listen(3001, 
    ()=>{
        console.log("Server is running on http://localhost:3001");
    });

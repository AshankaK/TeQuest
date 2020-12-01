// Import Express
const express = require('express');
const path = require('path');

//Invoke Express and assign to 'Server'
const server = express();

server.use(express.static('TeQuest'));

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


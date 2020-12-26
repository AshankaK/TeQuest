const express = require('express');
const router = express.Router(); 
const passport = require('passport');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const UserModel = require('../models/UserModel.js');
const jwtSecret = process.env.SECRET;
const cloudinary = require('cloudinary').v2;



router.get(
    '/', 
    (req, res) => {
        UserModel
        .find()
        .then(
            (document) => {
                res.send(document);
                console.log('user', document);
            }
        )
        .catch(
            (error) => {
                console.log('error', error);
            }
        )
    }
)

router.get(
    '/profile',
    passport.authenticate('jwt',{session:false}),
    (req,res) => {
        UserModel
        .findById(req.user.id)
        .then(
            (document) =>{
                res.send(document)
            })
    }
)

router.post(
    '/register', //users/register
    (req,res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        const newUserModel = new UserModel(formData);
        
        /*
        * (A) Here we check for unique emails and
        * (B) prepare password for registration,
        * (C) Upload image to Cloudinary if provided
        */
        //Part (A)
        //1. Search the database for a matching email address
        UserModel
        .findOne({email: formData.email})
        .then(
            async (document) => {
                if(document){
                            //2.1 If there is a match reject the registration
                            res.send({message: "An account with that email already exists!"});

                }
            else{
                    /* Part (C) */
                        // 1. Check if image is included
            
                         
    

                         if (Object.values(req.files).length > 0){
                          //  * 1.1 If included, upload to cloudinary
                            const files = Object.values(req.files);
                            await cloudinary.uploader.upload( 
                                //location of file
                                files[0].path, 
                                //callback for when file is uploaded
                                (error, cloudinaryResult) => {
                                    if(error){
                                        console.log('error from cloudinary', error)
                                        res.send({error: 'error from Cloudinary'});
                                    }
                                    console.log(cloudinaryResult);
                                    // 1.2 Take the image URL and append it to newUserModel
                                    newUserModel.photoUrl = cloudinaryResult.url
                                }
                            )

                         }
                         

                        
                            //2.2 If there is no match, then proceed to Part (B)
        
        
                                    /*    Part (B)   */
                        //1. Generate a salt
                        bcrypt.genSalt(
                            //2. Take salt and user's password to hash password
                    (err,salt) => {
                        bcrypt.hash(
                            formData.password,
                            salt,
                            (err, encryptedPassword) => {
                                //3. Replace user's password with the hash
                                newUserModel.password = encryptedPassword;
                                
                                //4. Save to database
                                newUserModel
                                    .save()
                                    .then(
                                        (document) =>{
                                            res.send(document);
                                        }
                                    )
                                    .catch(
                                        (error) =>{
                                            console.log('error', error);
                                            res.send({'error':error})
                                        }
                                    )

                                                }
                                            )
                                        }
                                    )

                }
            }
             )
        .catch(
            (error) =>{
                console.log('error', error);
            }
        )


        
    }
);

router.post(
    '/login', // users/login
    (req,res) =>{
        //1. Capture email and password
        const formData = 
        {
            email: req.body.email,
            password: req.body.password
        }
                //2 Search database for email
            UserModel
            .findOne({email: formData.email})
            .then(
                (document) =>{

                    if(document){
                        //2.1 Check for password if email is correct
                        bcrypt.compare(
                            formData.password, 
                            document.password
                        )
                        .then(
                            (passwordMatch) => {
                            //3.1 If password is correct, generate the json web token
                                if(passwordMatch === true){
                                        const payload ={
                                            id: document._id,
                                            email:document.email

                                        }
                                        jsonwebtoken.sign(
                                            payload,
                                            jwtSecret,
                                            (error, theToken)=>{
                                                if(error){
                                                    res.send({message: "Something went wrong"});
                                                }
                                                else{
                                                    //4 Send the json web token to the client
                                                    res.send({theToken: theToken});
                                                }
                                                
                                            }
                                            )
                                    

                                }
                                else{
                                    //3.2 If password is incorrect, reject the login.
                                    res.send({message: "Wrong email or password"});
                                }

                                
                            }

                        )
                        .catch(
                            (error) => {
                               res.send({message: "Something went wrong "});
                            }
                        )
                            

                            
                    }
                    else{
                        //2.2 If no email, reject the login
                        res.send({message: "Wrong email or password"});

                    }
                }

            )
            .catch(
                (error) => res.send({message: "Something went wrong"})

            )

                 

        
    }
)

router.put(
    '/update', //users/register
    passport.authenticate('jwt',{session:false}),
    async (req,res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            photoUrl: req.body.photoUrl
        };
        
        /*
        * (A) Here we check for unique emails and
        * (B) prepare password for registration,
        * (C) Upload image to Cloudinary if provided
        */
        //Part (A)
        //1. Search the database for a matching email address
                    /* Part (C) */
                        // 1. Check if image is included
            
                         
    

                         if (Object.values(req.files).length > 0){
                          //  * 1.1 If included, upload to cloudinary
                            const files = Object.values(req.files);
                            await cloudinary.uploader.upload( 
                                //location of file
                                files[0].path, 
                                //callback for when file is uploaded
                                (error, cloudinaryResult) => {
                                    if(error){
                                        console.log('error from cloudinary', error)
                                        res.send({error: 'error from Cloudinary'});
                                    }
                                    console.log(cloudinaryResult);
                                    // 1.2 Take the image URL and append it to newUserModel
                                    formData.photoUrl = cloudinaryResult.url
                                }
                            )

                         }
                         
                          if(formData.password.length > 0){
                          
                            //If user wants password changed.
                                    /*    Part (B)   */
                        //1. Generate a salt
                        bcrypt.genSalt(
                            //2. Take salt and user's password to hash password
                    (err,salt) => {
                        bcrypt.hash(
                            formData.password,
                            salt,
                            (err, encryptedPassword) => {

                                //4. Save to database
                                UserModel
                                    .findByIdAndUpdate(
                                        req.user.id,
                                        {
                                            $set:{
                                                firstName: formData.firstName,
                                                lastName: formData.lastName,
                                                email: formData.email,
                                                password: encryptedPassword,
                                                photoUrl: formData.photoUrl
                                            }
                                        }
                                    )
                                    .then(
                                        (document) =>{
                                            res.send(document);
                                        }
                                    )
                                    .catch(
                                        (error) =>{
                                            console.log('error', error);
                                            res.send({'error':error})
                                        }
                                    )

                                                }
                                            )
                                        }
                                    )

                }
                else{
                    UserModel
                    .findByIdAndUpdate(
                        req.user.id,
                        {
                            $set:{
                                firstName: formData.firstName,
                                lastName: formData.lastName,
                                email: formData.email,
                                photoUrl: formData.photoUrl
                            }
                        }
                    )
                    .then(
                        (document) =>{
                            res.send(document);
                        }
                    )
                    .catch(
                        (error) =>{
                            console.log('error', error);
                            res.send({'error':error})
                        }
                    )
                }
            }
            
        
    
);

module.exports = router;
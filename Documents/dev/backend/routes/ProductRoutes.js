const express = require('express');
const router = express.Router(); 
const ProductModel = require('../models/ProductModel.js');

router.get(
    '/',
    (req,res) =>{
        ProductModel
        .find()
        .then(
            (document) => {
                res.send(document);
                console.log('product', document);
            }
        )
        .catch(
            (error) => {
                console.log('error', error);
            }
        )
    }
);


router.post(
    '/',
    (req, res) => { 
        const formData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price
        };

        const newProductModel = new ProductModel(formData);
        newProductModel
        .save()
        .then(
            (document) => {
                res.send(document);
            }
        )
        .catch(
            (error) =>{
                console.log('error', error);
                res.send({'error': error});
            }
        )

    }
);

module.exports = router;
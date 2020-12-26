//Import Mongoose
const mongoose = require('mongoose');

//Schema
const ProductSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
        
    }
)

//Model
const ProductModel = new mongoose.model('products', ProductSchema);
//Export
module.exports = ProductModel;
//Import Mongoose
const mongoose = require('mongoose');

//Schema
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: true
        },
        addressLine3: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: false
        },
        zipCode: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        preferredTime: {
            type: Date,

        },
        isUnderage: {
            type: Boolean,
            required: true,
            default: false
        },
        dateCreated: {
            type: Date,
            default: Date.now
        }

        
    }
)

//Model
const UserModel = new mongoose.model('users', UserSchema);
//Export
module.exports = UserModel;
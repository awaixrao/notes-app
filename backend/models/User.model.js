const  mongoose  = require("mongoose")
require('dotenv').config();
const userSchema = new mongoose.Schema({
    name: {
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

    photo: {
        type: String,
        default : "",
        get :  attachServerUrlPhoto
        
    },

    gender: {
        type: String,
        enum: ["male", "female"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true, toJSON: {getters: true}, toObject: {getters: true}});

function attachServerUrlPhoto(value) {
    return process.env.SERVER_URL + value;
}

// model



const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;


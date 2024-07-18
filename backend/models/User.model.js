const  mongoose  = require("mongoose")
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
        default : "https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.jpg?s=1024x1024&w=is&k=20&c=YYtJJGvb4uXz9Ni9coUC8xitkbZFjp9qlwFR61g_koM="
        
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
}, {timestamps: true});

// model

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;


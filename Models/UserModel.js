import mongoose from "mongoose";

const user = mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Phone:{
        type: Number,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    Hobby:{
        type: String,
        required: false
    }

});

export default mongoose.model('users', user);
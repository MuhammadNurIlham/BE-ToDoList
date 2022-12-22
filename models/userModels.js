import mongoose from "mongoose";
// import { Schema } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    userName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
});

export default mongoose.model('User', userSchema);
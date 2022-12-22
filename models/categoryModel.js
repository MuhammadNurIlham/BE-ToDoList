import mongoose from "mongoose";
// import { Schema } from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String,
        required: true,
    },
});

export default mongoose.model('Category', categorySchema);
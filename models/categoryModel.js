import mongoose from "mongoose";

const category = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
});

export default mongoose.model('Category', category);
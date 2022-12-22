import mongoose, { Schema, SchemaType } from "mongoose";

const todo = mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'CategoryTodo',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
});

export default mongoose.model('Todos', todo);
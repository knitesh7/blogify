import { Schema, model } from "mongoose";

const commentSchema = Schema({
    body: {
        type: String,
        required:true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    createdOn:{
        type: Schema.Types.ObjectId,
        ref:"blogs",
        required: true
    }
}, { timestamps: true })

const commentModeler = model('comments', commentSchema)

export default commentModeler
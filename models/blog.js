import { Schema, model } from "mongoose";

const blogSchema = Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    coverImageUrl: {
        type: String,
        default: 'images/defaultCover.png'
    }
}, { timestamps: true })

const blogModeler = model('blogs', blogSchema)

export default blogModeler
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
        ref: "users",
        required: true
    },
    coverImageUrl: {
        type: String,
        default: 'images/defaultCover.png'
    },
    likesBy: {
        type: [{
            _id: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }, fullName: { type: String },profileImageUrl:{ type:String}
        }]
    }
}, { timestamps: true })

const blogModeler = model('blogs', blogSchema)

export default blogModeler
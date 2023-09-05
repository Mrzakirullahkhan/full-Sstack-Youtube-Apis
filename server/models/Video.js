import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({

    // yha properties aengi ..
    userId: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    
    imgUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: [String],
        default: []
    },

},
    { timestamps: true }
);

export default mongoose.model("Video", videoSchema)
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    username: { type: String, required: true },
    imageurl: { type: String, required: true },
    caption:{type: String, required: true},
    comments: { 
        type: [{ 
            username: { type: String, required: true }, 
            comments: { type: String, required: true } 
        }], 
        default: [] 
    },
    likes: { 
        type: [String], 
        default: [], 
        validate: [array => array.every(item => typeof item === 'string'), 'Likes must be an array of strings'] 
    },
    createdAt: { type: Date, default: Date.now }
});

export const PostModel = mongoose.model('Post', PostSchema);



import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userMessage: {
        type: String,
        required: [true, 'User message is required'],
        minLenght: [2, 'User message must be at least 2 characters long'],
        maxLenght: [1000, 'User message must be at most 500 characters long'],
        trim: true,
    },
    aiResponse: {
        type: String,
        required: [true, 'AI response is required'],
        minLenght: [1, 'AI response must be empty'],
        maxLenght: [3000, 'AI response must be at most 300 characters long'],
        trim: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    
})

export default mongoose.model('Message', messageSchema)
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userMessage: { type: String, required: true },
    aiResponse: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });

export default mongoose.model('Message', messageSchema)
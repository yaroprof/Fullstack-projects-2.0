import mongoose from "mongoose";

const decisionSchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  aiResponse: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ← ДОДАНО
  createdAt: { type: Date, default: Date.now },
});
const Decision = mongoose.model('Decision', decisionSchema);
export default Decision;
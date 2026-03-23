import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message: String,
  response: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Chat", chatSchema);
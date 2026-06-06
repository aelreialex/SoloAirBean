import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  }
});

const ApiKey = mongoose.model("keys", apiKeySchema);

export default ApiKey;

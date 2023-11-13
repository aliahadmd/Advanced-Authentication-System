import mongoose from "mongoose"

const tokenSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    vToken: {
      type: String,
      default: "",
    },
    rToken: {
      type: String,
      default: "",
    },
    lToken: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  });
  
  const Token = mongoose.model("Token", tokenSchema);
  export default Token;

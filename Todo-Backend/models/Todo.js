const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "done", "canceled"], default: "pending" },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;

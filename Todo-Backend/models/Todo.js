const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  activities_no: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Unmarked", "Done", "Canceled"], default: "Unmarked" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Todo", todoSchema);

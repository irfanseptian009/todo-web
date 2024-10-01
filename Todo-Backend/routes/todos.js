const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middlewares/auth");
const router = express.Router();

// Create new todo
router.post("/", auth, async (req, res) => {
  const { subject, description } = req.body;

  if (!subject || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Generate activities_no in format "AC-XXXX"
    const lastTodo = await Todo.findOne({}).sort({ activities_no: -1 });
    const activities_no = lastTodo
      ? `AC-${String(Number(lastTodo.activities_no.split("-")[1]) + 1).padStart(4, "0")}`
      : "AC-0001";

    const newTodo = new Todo({
      activities_no,
      subject,
      description,
      userId: req.user.id,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get user todos
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

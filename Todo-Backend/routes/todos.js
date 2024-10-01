const express = require("express");
const Todo = require("../models/Todo");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Get all todos for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new todo
router.post("/", authMiddleware, async (req, res) => {
  const { subject, description } = req.body;
  const todo = new Todo({ subject, description, userId: req.user.id });
  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a todo
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.subject = req.body.subject || todo.subject;
    todo.description = req.body.description || todo.description;
    todo.status = req.body.status || todo.status;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todo.remove();
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

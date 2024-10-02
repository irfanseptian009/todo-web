const express = require("express");
const Todo = require("../models/Todo");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Create a new todo
router.post("/", async (req, res) => {
  const { subject, description, userId } = req.body;

  // Validate input
  if (!subject || !description || !userId) {
    return res
      .status(400)
      .json({ error: "Subject, description, and userId are required." });
  }

  try {
    const activities_no = uuidv4();
    const newTodo = new Todo({ activities_no, subject, description, userId });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Failed to create todo." });
  }
});

// Fetch todos for a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos." });
  }
});

// Update a todo
router.put("/:activities_no", async (req, res) => {
  const { activities_no } = req.params;
  const { subject, description, status } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { activities_no },
      { subject, description, status },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Failed to update todo." });
  }
});

// Delete a todo
router.delete("/:activities_no", async (req, res) => {
  const { activities_no } = req.params;

  try {
    const deletedTodo = await Todo.findOneAndDelete({ activities_no });
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.json({ message: "Todo deleted." });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo." });
  }
});

module.exports = router;

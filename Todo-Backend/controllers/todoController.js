const Todo = require("../models/Todo");
const User = require("../models/User");

// Create a new To-Do
exports.createTodo = async (req, res) => {
  const { subject, description, userId } = req.body;

  try {
    const count = await Todo.countDocuments();
    const activities_no = `AC-${String(count + 1).padStart(4, "0")}`;

    const todo = new Todo({
      activities_no,
      subject,
      description,
      userId,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create to-do" });
  }
};

// Get To-Do list
exports.getTodos = async (req, res) => {
  const { userId } = req.query;

  try {
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch to-do list" });
  }
};

// Update To-Do
exports.updateTodo = async (req, res) => {
  const { activities_no } = req.params;
  const { status, subject, description } = req.body;

  try {
    const todo = await Todo.findOne({ activities_no });
    if (!todo) return res.status(404).json({ message: "To-do not found" });

    if (status) todo.status = status;
    if (subject) todo.subject = subject;
    if (description) todo.description = description;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update to-do" });
  }
};

// Delete To-Do
exports.deleteTodo = async (req, res) => {
  const { activities_no } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ activities_no, status: "Unmarked" });
    if (!todo)
      return res.status(404).json({ message: "To-do not found or already marked" });

    res.json({ message: "To-do deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete to-do" });
  }
};

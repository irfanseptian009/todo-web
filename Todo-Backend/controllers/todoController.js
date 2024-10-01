const Todo = require("../models/Todo");
let counter = 1;

// Create To-Do
exports.createTodo = async (req, res) => {
  const { subject, description } = req.body;
  const user = req.user;

  const activity_no = `AC-${String(counter++).padStart(4, "0")}`;

  const todo = await Todo.create({
    activity_no,
    subject,
    description,
    user: user._id,
  });

  res.status(201).json(todo);
};

// Get To-Do List
exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.status(200).json(todos);
};

// Update To-Do (subject/description)
exports.updateTodo = async (req, res) => {
  const { subject, description } = req.body;
  const todo = await Todo.findOne({
    activity_no: req.params.activity_no,
    user: req.user._id,
  });

  if (todo && todo.status === "Unmarked") {
    todo.subject = subject || todo.subject;
    todo.description = description || todo.description;
    await todo.save();
    res.status(200).json(todo);
  } else {
    res.status(400).json({ message: "Cannot update this todo" });
  }
};

// Delete To-Do
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findOne({
    activity_no: req.params.activity_no,
    user: req.user._id,
  });
  if (todo && todo.status === "Unmarked") {
    await todo.remove();
    res.status(200).json({ message: "To-Do deleted" });
  } else {
    res.status(400).json({ message: "Cannot delete this todo" });
  }
};

// Mark To-Do
exports.markTodo = async (req, res) => {
  const todo = await Todo.findOne({
    activity_no: req.params.activity_no,
    user: req.user._id,
  });
  if (todo) {
    todo.status = req.body.status;
    await todo.save();
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "To-Do not found" });
  }
};

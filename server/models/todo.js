const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: false },
  id: { type: Number, required: true, default: 100 },
});

const model = mongoose.model("TodoSchema", TodoSchema);

module.exports = model;

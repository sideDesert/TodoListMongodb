const mongoose = require("mongoose");

const deletionKey = new mongoose.Schema({
  id: { type: Number, required: true },
});

const key = mongoose.model("key", deletionKey);

module.exports = key;

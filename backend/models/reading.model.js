const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const readingSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Reading = mongoose.model("Reading", readingSchema);

module.exports = Reading;

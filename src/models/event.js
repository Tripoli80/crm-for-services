import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  client: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "client",
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;

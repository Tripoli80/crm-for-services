import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    default: "",
    trim: true,
  },
  age: {
    type: Number,
    default: 18,

    trim: true,
  },
  description: {
    type: String,
    default: "",

    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  customfield: { type: Schema.Types.Mixed },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = model("user", userSchema);

export default User;

import { Schema, model } from "mongoose";
const clientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "",
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
      },
    ],
  },
  { timestamps: true }
);

const Client = model("Client", clientSchema);

export default Client;

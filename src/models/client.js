import { Schema, model } from "mongoose";
const clientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
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
      enum: ["male", "female", "---"],
      default: "---",
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "events",
      },
    ],
    customfield: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Client = model("Client", clientSchema);

export default Client;

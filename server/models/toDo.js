import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["выполнен", "ожидает выполнения"],
      default: "ожидает выполнения",
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("toDo", toDoSchema);

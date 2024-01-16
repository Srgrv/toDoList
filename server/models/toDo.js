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
      enum: ["выполнен", "в процессе", "ожидает выполнения"],
      default: "ожидает выполнения",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("toDo", toDoSchema);

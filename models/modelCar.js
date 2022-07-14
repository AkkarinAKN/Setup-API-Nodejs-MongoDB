import mongoose from "mongoose";
const CarSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    seat: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);

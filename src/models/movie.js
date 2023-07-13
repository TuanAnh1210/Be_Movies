import mongoose from "mongoose";
const { Schema } = mongoose;

const Movie = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Movie", Movie);

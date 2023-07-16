import mongoose from "mongoose";
const { Schema } = mongoose;

const Casts = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Movie = new Schema({
  title: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
  casts: {
    type: [Casts],
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

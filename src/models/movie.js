import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

const Movie = new Schema({
  title: {
    type: String,
    required: true,
  },
  genres: { type: Schema.Types.ObjectId, ref: "Genres", required: true },
  casts: [{ type: Schema.Types.ObjectId, ref: "Cast", required: true }],
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

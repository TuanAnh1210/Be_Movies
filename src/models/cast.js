import mongoose from "mongoose";
const { Schema } = mongoose;

const Cast = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Cast", Cast);

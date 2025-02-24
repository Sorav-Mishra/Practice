import mongoose from "mongoose";

const McqSchema = new mongoose.Schema({
  question_number: Number,
  exam_name: String,
  question: String,
  options: {
    a: String,
    b: String,
    c: String,
    d: String,
  },
  correct_option: String,
  solution: String,
});

const Mcq = mongoose.models.Mcq || mongoose.model("Mcq", McqSchema);

export default Mcq;

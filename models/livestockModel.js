import mongoose from "mongoose"

const livestockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantityMale: {
    type: Number,
    required: true,
  },
  quantityFemale: {
    type: Number,
    required: true,
  },
  quantityChild: {
    type: Number,
    required: true,
  },
  quantityDead: {
    type: Number,
    default: 0,
  },
})

const Livestock = mongoose.model("Livestock", livestockSchema)
export default Livestock

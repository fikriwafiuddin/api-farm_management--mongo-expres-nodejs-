import mongoose from "mongoose"

const farmSchema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    default: 0,
  },
  debt: {
    type: Number,
    default: 0,
  },
  livestock: {
    type: Array,
    default: [],
    items: {
      type: String,
    },
  },
  totalLivestock: {
    type: Number,
    default: 0,
  },
})

const Farm = mongoose.model("Farm", farmSchema)
export default Farm

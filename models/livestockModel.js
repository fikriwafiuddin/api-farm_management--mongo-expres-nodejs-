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

// Menambahkan virtual field 'total'
livestockSchema.virtual("total").get(function () {
  return this.quantityMale + this.quantityFemale + this.quantityChild
})

// Mengaktifkan virtual fields agar termasuk dalam toJSON dan toObject output
livestockSchema.set("toJSON", {
  virtuals: true,
  // versionKey: false,
  transform: function (doc, ret) {
    delete ret.id
  },
})
livestockSchema.set("toObject", {
  virtuals: true,
  // versionKey: false,
  transform: function (doc, ret) {
    delete ret.id
  },
})

const Livestock = mongoose.model("Livestock", livestockSchema)
export default Livestock

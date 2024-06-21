import mongoose from "mongoose"

const livestockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  male: {
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    feed: {
      type: Number,
      default: 0, // Feed consumed in grams per day
    },
  },
  female: {
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    feed: {
      type: Number,
      default: 0, // Feed consumed in grams per day
    },
  },
  child: {
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    feed: {
      type: Number,
      default: 0, // Feed consumed in grams per day
    },
  },
  product: {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  quantityDead: {
    type: Number,
    default: 0,
  },
})

// Menambahkan virtual field 'total'
livestockSchema.virtual("total").get(function () {
  return this.male.quantity + this.female.quantity + this.child.quantity
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

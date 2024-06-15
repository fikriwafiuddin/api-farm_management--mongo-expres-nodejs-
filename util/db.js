import mongoose from "mongoose"

const connectDb = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/livestock_management")
  const db = mongoose.connection
  db.on("error", (error) => {
    console.log(error)
  })
  db.once("open", () => {
    console.log("Database Connected...")
  })
}

export default connectDb

import express from "express"
import route from "./router.js"
import connectDb from "./util/db.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
connectDb()
app.use(route)

app.listen(port, () => {
  console.log(`Aplikasi manajemen peternakan listening on port ${port}`)
})

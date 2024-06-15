import express from "express"
import {
  addLivestock,
  detailLivestock,
  editQuantity,
} from "./controller/livestockController.js"
import { displayLivestock } from "./controller/display.js"

const route = express.Router()

route.get("/", displayLivestock)
route.get("/detailLivestock/:name", detailLivestock)
route.post("/addLivestock", addLivestock)
route.patch("/editQuantity", editQuantity)

export default route

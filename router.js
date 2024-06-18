import express from "express"
import {
  addLivestock,
  allLivestock,
  deathLivestock,
  deleteLivestock,
  detailLivestock,
} from "./controller/livestockController.js"
import { login, register } from "./controller/farmController.js"
import { verifyToken } from "./middleware/verifyToken.js"

const route = express.Router()

route.post("/register", register)
route.post("/login", login)

route.get("/", verifyToken, allLivestock)
route.get("/detailLivestock/:name", verifyToken, detailLivestock)
route.post("/addLivestock", verifyToken, addLivestock)
route.patch("/deathLivestock", verifyToken, deathLivestock)
route.delete("/deleteLivestock", verifyToken, deleteLivestock)

export default route

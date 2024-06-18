import jwt from "jsonwebtoken"
import Farm from "../models/farmModel.js"

export const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization
  try {
    if (!token && !token.startsWith("Bearer")) {
      return res.status(401).send("Unauthorized")
    }

    token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(token, "Secret Key")
    req.farm = await Farm.findById(decoded.id).select("-password")
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json("Invalid token")
  }
}

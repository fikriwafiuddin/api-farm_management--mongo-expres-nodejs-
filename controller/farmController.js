import Farm from "../models/farmModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
  return jwt.sign({ id }, "Secret Key", { expiresIn: "30d" })
}

export const register = async (req, res) => {
  const { farmName, owner, password } = req.body
  try {
    if (!farmName || !owner || !password) {
      return res.status(400).json("Please add all filds")
    }

    const farm = await Farm.find()
    if (farm.length > 0) {
      return res.status(400).json("Can't create account again")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const createFarm = await Farm.create({
      farmName,
      owner,
      password: hashPassword,
    })

    return res.status(200).json(generateToken(createFarm._id))
  } catch (error) {
    res.status(400).json("Failed register, system error.")
    console.error(error)
  }
}

export const login = async (req, res) => {
  const { farmName, password } = req.body
  try {
    const farm = await Farm.findOne({ farmName })
    if (!farm) {
      return res.status(401).json("Account not found")
    }

    const comparePassword = await bcrypt.compare(password, farm.password)
    if (!comparePassword) {
      return res.status(400).json("Password is wrong")
    }

    return res.status(200).json(generateToken(farm._id))
  } catch (error) {
    res.status(400).json("Failed login")
    console.error(error)
  }
}

export const editFarm = async (req, res) => {
  const { ...data } = req.body
  const farmId = req.farm
  try {
    const farm = await Farm.findById(farmId)
    if (!farm) {
      res.status(401).json("Account not found")
    }

    await Farm.findByIdAndUpdate(farmId, { $set: data })
    return res.status(200).json("Success")
  } catch (error) {
    res.status(400).json("Failed edit")
    console.log(error)
  }
}

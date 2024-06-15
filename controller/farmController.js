import Farm from "../models/farmModel"
import bcrypt from "bcrypt"
import { response } from "express"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
  jwt.sign({ id }, "Secret Key", { expiresIn: "30d" })
}

export const register = async (req, res) => {
  const { farmName, owner, password } = req.body
  try {
    if (!farmName || !owner || !password) {
      res.status(400).json("Please add all filds")
    }

    const farm = await Farm.findOne({ farmName })
    const comparePassword = await bcrypt.compare(password, farm.password)
    if (comparePassword) {
      return res.status(400).json("This account is already axist")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    Farm.create({
      farmName,
      owner,
      password: hashPassword,
    }).then((response) => res.status(200).json(generateToken(response._id)))
  } catch (error) {
    res.status(400).json("Failed register, system error.")
    console.error(error)
  }
}

export const login = async (req, res) => {
  const { farmName, owner, password } = req.body
  try {
    const farm = await Farm.findOne({ farmName })
    if (!farm) {
      return res.status(401).json("Account not found")
    }

    const comparePassword = await bcrypt.compare(password, farm.password)
    if (!comparePassword) {
      return res.status(400).json("Password is wrong")
    }

    res.status(200).json(generateToken(farm._id))
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
    res.status(200).json("Success")
  } catch (error) {
    res.status(400).json("Failed edit")
    console.log(error)
  }
}

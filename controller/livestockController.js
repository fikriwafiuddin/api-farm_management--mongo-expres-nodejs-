import Farm from "../models/farmModel.js"
import Livestock from "../models/livestockModel.js"

export const addLivestock = async (req, res) => {
  const { name, quantityMale, quantityFemale, quantityChild } = req.body
  const farmId = req.farm
  try {
    if (!name || !quantityMale || !quantityFemale || !quantityChild) {
      return res.status(400).json("Please add filds!")
    }

    const livestockIsExist = await Livestock.findOne({ name })
    if (livestockIsExist) {
      return res.status(400).json("Livestock is exist!")
    }

    await Livestock.create({
      name,
      quantityMale,
      quantityFemale,
      quantityChild,
    })

    await Farm.findOneAndUpdate(
      { farmName: farmId.farmName },
      { $push: { livestock: name } }
    )

    res.status(200).json("Success")
  } catch (error) {
    console.log(error)
    res.status(400)
  }
}

export const detailLivestock = async (req, res) => {
  const name = req.params.name
  try {
    const livestock = await Livestock.findOne({ name })
    if (!livestock) {
      res.status(401).json("Livestock not found")
    }

    res.status(200).json(livestock)
  } catch (error) {
    res.status(400)
    console.log(error)
  }
}

export const editQuantity = async (req, res) => {
  const { name, ...quantities } = req.body
  try {
    for (const key in quantities) {
      if (quantities[key] < 0) {
        return res.status(400).json(`Quantity cannot be less than 0.`)
      }
    }

    const livestock = await Livestock.findOne({ name })
    if (!livestock) {
      res.status(401).json("Livestock not found")
    }

    await Livestock.findOneAndUpdate({ name }, { $set: quantities })

    res.status(200).json("Success update quantity")
  } catch (error) {
    res.status(400)
    console.log(error)
  }
}

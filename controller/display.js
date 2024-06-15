import Livestock from "../models/livestockModel.js"

export const displayLivestock = async (req, res) => {
  try {
    const getLivestock = await Livestock.find()
    if (!getLivestock) {
      return res.status(401).json("Livestock not found!")
    }

    res.status(200).json(getLivestock)
  } catch (error) {
    res.status(400)
    console(error)
  }
}

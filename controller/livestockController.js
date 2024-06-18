import Farm from "../models/farmModel.js"
import Livestock from "../models/livestockModel.js"

export const addLivestock = async (req, res) => {
  const { name, quantityMale, quantityFemale, quantityChild } = req.body
  const farm = req.farm
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
      { farmName: farm.farmName },
      {
        $push: { livestock: name },
        $set: {
          totalLivestock:
            farm.totalLivestock +
            parseInt(quantityMale) +
            parseInt(quantityFemale) +
            parseInt(quantityChild),
        },
      }
    )

    res.status(200).json("Success")
  } catch (error) {
    console.log(error)
    res.status(400)
  }
}

export const allLivestock = async (req, res) => {
  try {
    const getAllLivestock = await Livestock.find()
    if (!getAllLivestock || getAllLivestock.length === 0) {
      return res.status(404).json("Livestock not found")
    }

    return res.status(200).json(getAllLivestock)
  } catch (error) {
    console.log(error)
    return res.status(400).json("System error")
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

export const deathLivestock = async (req, res) => {
  const { name, ...quantities } = req.body
  const farm = req.farm
  try {
    const livestock = await Livestock.findOne({ name })
    if (!livestock) {
      return res.status(401).json("Livestock not found")
    }

    for (const key in quantities) {
      if (!Number.isFinite(quantities[key])) {
        return res.status(400).json({ error: `${key} must be a number` })
      }
    }
    if ("quantityMale" in quantities && livestock.quantityMale > 0) {
      livestock.quantityMale -= parseInt(quantities.quantityMale)
    }
    if ("quantityFemale" in quantities && livestock.quantityFemale > 0) {
      livestock.quantityFemale -= parseInt(quantities.quantityFemale)
    }
    if ("quantityChild" in quantities && livestock.quantityChild) {
      livestock.quantityChild -= parseInt(quantities.quantityChild)
    }

    livestock.quantityDead += Object.values(quantities).reduce(
      (total, value) => total + parseInt(value)
    )
    farm.totalLivestock -= Object.values(quantities).reduce(
      (total, value) => total + parseInt(value)
    )

    await livestock.save()
    await farm.save()

    return res.status(200).json("Succsess")
  } catch (error) {
    console.log(error)
    return res.status(400).json("System error")
  }
}

export const deleteLivestock = async (req, res) => {
  const name = req.body.name
  const farm = req.body
  try {
    const livestock = await Livestock.findOneAndDelete({ name })
    if (!livestock) {
      return res.status(401).json("Livestock not found")
    }

    farm.livestock.pull(name)
    farm.totalLivestock -=
      livestock.quantityMale +
      livestock.quantityFemale +
      livestock.quantityChild
    await farm.save()

    return res.status(200).json("Success")
  } catch (error) {
    console.log(error)
    return res.status(400).json("System error")
  }
}

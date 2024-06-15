const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]
  try {
    if (!token) {
      return res.status(401).send("Unauthorized")
    }

    const decoded = jwt.verify(token, "secretKey")
    req.farm = decoded
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json("Invalid token")
  }
}

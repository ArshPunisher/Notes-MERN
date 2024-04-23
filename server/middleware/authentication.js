const { verifyToken } = require("../service/authentication");

function checkAuth(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) return res.sendStatus(401)

  try {
    const user = verifyToken(token)
    req.user = user;
    return next();
  } catch (error) {
    res.status(401).json({error:true, message:error.message})
  }
}

module.exports = { checkAuth };
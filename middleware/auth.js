const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ error: err }).status(500);
      }
      req.user = { id: decoded.id };
      next();
    });
  } else {
    res.json({ error: 'There is no authorization header.' }).status(404);
  }
};

module.exports = authMiddleware;

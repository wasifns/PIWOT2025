// var jwt = require('jsonwebtoken');
// const JWT_SECRET = 'Harryisagoodb$oy';

// const fetchuser = (req, res, next) => {
//     // Get the user from the jwt token and add id to req object
//     const token = req.header('auth-token');
//     if (!token) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" })
//     }

// }


// module.exports = fetchuser;

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

module.exports = (req, res, next) => {
  // Get the token from the header
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: 'Access denied: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Decode the token
    req.user = decoded.user; // Attach user object to request (including email)
    next();
  } catch (err) {
    res.status(401).send({ error: 'Access denied: Invalid token.' });
  }
};


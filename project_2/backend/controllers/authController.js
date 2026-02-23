const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;
 console.log(email, password);
  // Check against .env variables
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.json({ success: true, token });
  }

  res.status(401).json({ message: "Invalid email or password" });
};

// Verify call to check if token is still valid
exports.verifyToken = (req, res) => {
  res.json({ success: true, admin: req.admin });
};
 

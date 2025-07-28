const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('password123', 10); // Hardcoded password
const JWT_SECRET = process.env.JWT_SECRET;

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME || !bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
}; 
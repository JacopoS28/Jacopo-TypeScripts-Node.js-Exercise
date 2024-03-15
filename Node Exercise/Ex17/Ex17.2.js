// controllers/users.js
const db = pgPromise()("postgres://postgres:postgres@localhost:3000/");
const jwt = require('jsonwebtoken');

// User login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.oneOrNone('SELECT * FROM users WHERE username=$1 AND password=$2', [username, password]);
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' });
      await db.none('UPDATE users SET token=$1 WHERE id=$2', [token, user.id]);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User profile
const profile = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  login,
  profile
};

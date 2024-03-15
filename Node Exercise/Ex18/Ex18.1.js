// JWT 2
// controllers/users.js
const db = pgPromise()("postgres://postgres:postgres@localhost:3000/");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User signup
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.json({ msg: 'Signup successful. Now you can log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.oneOrNone('SELECT * FROM users WHERE username=$1', username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, { expiresIn: '1h' });
    await db.none('UPDATE users SET token=$1 WHERE id=$2', [token, user.id]);
    res.json({ token, id: user.id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login
};

// controllers/users.js
const db = pgPromise()("postgres://postgres:postgres@localhost:3000/");
// User logout
const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    await db.none('UPDATE users SET token=NULL WHERE id=$1', userId);
    res.json({ msg: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  logout
};

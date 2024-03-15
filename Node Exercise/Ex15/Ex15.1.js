// controllers/planets.js
const db = pgPromise()("postgres://postgres:postgres@localhost:3000/");

// Get all planets
const getAll = async (req, res) => {
  try {
    const planets = await db.any('SELECT * FROM planets');
    res.json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get planet by ID
const getOneById = async (req, res) => {
  try {
    const id = req.params.id;
    const planet = await db.one('SELECT * FROM planets WHERE id=$1', id);
    res.json(planet);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Planet not found' });
  }
};

// Create a planet
const create = async (req, res) => {
  try {
    const { name } = req.body;
    await db.none('INSERT INTO planets (name) VALUES ($1)', name);
    res.status(201).json({ msg: 'Planet created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a planet by ID
const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    await db.none('UPDATE planets SET name=$2 WHERE id=$1', [id, name]);
    res.json({ msg: 'Planet updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Planet not found' });
  }
};

// Delete a planet by ID
const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    await db.none('DELETE FROM planets WHERE id=$1', id);
    res.json({ msg: 'Planet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Planet not found' });
  }
};

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById
};

// controllers/planets.js
const db = pgPromise()("postgres://postgres:postgres@localhost:3000/");

// Upload image and update planet in the database
const uploadImage = async (req, res) => {
  try {
    const id = req.params.id;
    const imagePath = req.file.path; // File path saved by multer
    await db.none('UPDATE planets SET image=$1 WHERE id=$2', [imagePath, id]);
    res.json({ msg: 'Planet image uploaded and updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  uploadImage
};

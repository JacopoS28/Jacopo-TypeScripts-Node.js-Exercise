//CRUD with dummy database

const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Dummy database of planets
let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

// Validation schema for planet fields
const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

// Middleware to validate planet fields
const validatePlanet = (req, res, next) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// GET all planets
router.get('/api/planets', (req, res) => {
  res.json(planets);
});

// GET planet by ID
router.get('/api/planets/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) {
    return res.status(404).json({ error: "Planet not found" });
  }
  res.json(planet);
});

// POST create a planet
router.post('/api/planets', validatePlanet, (req, res) => {
  const newPlanet = req.body;
  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
});

// PUT update a planet by ID
router.put('/api/planets/:id', validatePlanet, (req, res) => {
  const planetId = parseInt(req.params.id);
  const planetIndex = planets.findIndex(p => p.id === planetId);
  if (planetIndex === -1) {
    return res.status(404).json({ error: "Planet not found" });
  }
  planets[planetIndex] = req.body;
  res.json({ msg: "Planet updated successfully" });
});

// DELETE a planet by ID
router.delete('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);
  const planetIndex = planets.findIndex(p => p.id === planetId);
  if (planetIndex === -1) {
    return res.status(404).json({ error: "Planet not found" });
  }
  planets.splice(planetIndex, 1);
  res.json({ msg: "Planet deleted successfully" });
});

module.exports = router;

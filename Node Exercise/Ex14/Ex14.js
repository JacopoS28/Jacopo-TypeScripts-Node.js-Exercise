//Add controllers

// controllers/planets.ts
import Joi from 'joi';

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

// Get all planets
export const getAll = (req, res) => {
  res.json(planets);
};

// Get planet by ID
export const getOneById = (req, res) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find(p => p.id === planetId);
  if (!planet) {
    return res.status(404).json({ error: "Planet not found" });
  }
  res.json(planet);
};

// Create a new planet
export const create = (req, res) => {
  const newPlanet = req.body;
  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
};

// Update a planet by ID
export const updateById = (req, res) => {
  const planetId = parseInt(req.params.id);
  const planetIndex = planets.findIndex(p => p.id === planetId);
  if (planetIndex === -1) {
    return res.status(404).json({ error: "Planet not found" });
  }
  planets[planetIndex] = req.body;
  res.json({ msg: "Planet updated successfully" });
};

// Delete a planet by ID
export const deleteById = (req, res) => {
  const planetId = parseInt(req.params.id);
  const updatedPlanets = planets.filter(p => p.id !== planetId);
  if (updatedPlanets.length === planets.length) {
    return res.status(404).json({ error: "Planet not found" });
  }
  planets = updatedPlanets;
  res.json({ msg: "Planet deleted successfully" });
};

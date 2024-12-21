const Plant = require('../models/plant');
const { handleError } = require('./errorController');

// List all plants
exports.listPlants = (req, res) => {
  Plant.find()
    .then(plants => res.render('plants', { plants }))
    .catch(err => handleError(err, req, res));
};

// Show a specific plant
exports.showPlant = (req, res) => {
  const { id } = req.params;
  Plant.findById(id)
    .then(plant => (plant ? res.render('show', { plant }) : handleError(new Error('Plant not found'), req, res)))
    .catch(err => handleError(err, req, res));
};

// Create a new plant form
exports.newPlantForm = (req, res) => {
  res.render('create');
};

// Create a new plant
exports.createPlant = (req, res) => {
  const newPlant = new Plant(req.body);
  newPlant.save()
    .then(() => res.redirect('/plants'))
    .catch(err => handleError(err, req, res));
};

// Edit a plant form
exports.editPlantForm = (req, res) => {
  const { id } = req.params;
  Plant.findById(id)
    .then(plant => (plant ? res.render('edit', { plant }) : handleError(new Error('Plant not found'), req, res)))
    .catch(err => handleError(err, req, res));
};

// Update a plant
exports.updatePlant = (req, res) => {
  const { id } = req.params;
  Plant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/plants/${id}`))
    .catch(err => handleError(err, req, res));
};

// Delete a plant
exports.deletePlant = (req, res) => {
  const { id } = req.params;
  Plant.findByIdAndDelete(id)
    .then(() => res.redirect('/plants'))
    .catch(err => handleError(err, req, res));
};
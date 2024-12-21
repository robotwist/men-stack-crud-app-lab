const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const plantsController = require('./controllers/plantsController');
const { handleError } = require('./controllers/errorController');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set EJS as the view engine with a views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

  
// Serve the index.ejs file at the root route
app.get('/', (req, res) => {
  res.render('index');
});

// Routes
app.get('/plants/new', plantsController.newPlantForm);
app.get('/plants', plantsController.listPlants);
app.get('/plants/:id', plantsController.showPlant);
app.post('/plants', plantsController.createPlant);
app.get('/plants/:id/edit', plantsController.editPlantForm);
app.put('/plants/:id', plantsController.updatePlant);
app.delete('/plants/:id', plantsController.deletePlant);

// Error handling middleware
app.use(handleError);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
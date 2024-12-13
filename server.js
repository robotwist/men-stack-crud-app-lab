const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const plantsData = require('./plants')


// Set EJS as the view engine
app.set('view engine', 'ejs');


// Define the port number
const port = 3002;


require('dotenv').config();
// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URI,)
.then(() => {
    console.log('MongoDB Connected');
})
.catch(err => console.error(err));


// Define the plant schema
const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String
});


// Create the Plant model
const Plant = mongoose.model('Plant', plantSchema);


// Routes
// Home page
app.get('/', (req, res) => {
  res.render('index');
});


// List all plants
app.get('/plants', (req, res) => {
  Plant.find()
    .then(plants => {
      res.render('plants', { plants });
    })
    .catch(err => {
      res.render('error', { message: 'Error fetching plants' });
    });
});


// Show a specific plant
app.get('/plants/:id', (req, res) => {
  const { id } = req.params;
  Plant.findById(id)
    .then(plant => {
      res.render('show', { plant });
    })
    .catch(err => {
      res.render('error', { message: 'Plant not found' });
    });
});


// Create a new plant
app.get('/plants/new', (req, res) => {
  res.render('create');
});


app.post('/plants', (req, res) => {
  const newPlant = new Plant({
    name: req.body.name,
    description: req.body.description
  });


  newPlant.save()
    .then(() => res.redirect('/plants'))
    .catch(err => console.error(err));
});


// Edit a plant
app.get('/plants/:id/edit', (req, res) => {
  const { id } = req.params;
  Plant.findById(id)
    .then(plant => {
      res.render('edit', { plant });
    })
    .catch(err => {
      res.render('error', { message: 'Plant not found' });
    });
});


app.put('/plants/:id', (req, res) => {
  const { id } = req.params;
  Plant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/plants/${id}`))
    .catch(err => console.error(err));
});


// Delete a plant
app.delete('/plants/:id', (req, res) => {
  const { id } = req.params;
  Plant.findByIdAndDelete(id)
    .then(() => res.redirect('/plants'))
    .catch(err => console.error(err));
});


// Route for static plants
app.get('/static-plants', (req, res) => {
  res.render('items', { plants: plantsData });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});    


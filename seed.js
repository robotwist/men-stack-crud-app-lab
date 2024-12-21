const mongoose = require('mongoose');
const Plant = require('./models/plant'); // Assuming your Plant model is in models/plant.js

require('dotenv').config(); 

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    // Define some sample plant data
    const initialPlants = [
      { name: 'Rose', description: 'A beautiful and fragrant flower.', image: 'rose.jpg' },
      { name: 'Sunflower', description: 'A tall plant with large, yellow flowers.', image: 'sunflower.jpg' },
      { name: 'Orchid', description: 'A delicate and exotic flower.', image: 'orchid.jpg' },
      { name: 'Lily', description: 'A graceful flower with trumpet-shaped blooms.', image: 'lily.jpg' },
      { name: 'Tulip', description: 'A spring-blooming flower with vibrant colors.', image: 'tulip.jpg' },
      { name: 'Daffodil', description: 'A cheerful spring-blooming flower.', image: 'daffodil.jpg' },
      { name: 'Cactus', description: 'A succulent plant with spines.', image: 'cactus.jpg' },
      { name: 'Succulent', description: 'A plant with fleshy leaves that store water.', image: 'succulent.jpg' },
      { name: 'Fern', description: 'A plant with feathery leaves.', image: 'fern.jpg' },
      { name: 'Bonsai', description: 'A miniature tree grown in a pot.', image: 'bonsai.jpg' },
      { name: 'Aloe Vera', description: 'A succulent plant with medicinal properties.', image: 'aloe_vera.jpg' },
      { name: 'Snake Plant', description: 'A hardy indoor plant with upright leaves.', image: 'snake_plant.jpg' },
      { name: 'Pothos', description: 'A trailing vine with heart-shaped leaves.', image: 'pothos.jpg' },
      { name: 'Spider Plant', description: 'A common houseplant with long, arching leaves.', image: 'spider_plant.jpg' },
      { name: 'Peace Lily', description: 'A flowering plant with white blooms.', image: 'peace_lily.jpg' },
      { name: 'Fiddle Leaf Fig', description: 'A popular houseplant with large, fiddle-shaped leaves.', image: 'fiddle_leaf_fig.jpg' },
      { name: 'Monstera', description: 'A tropical plant with large, split leaves.', image: 'monstera.jpg' },
      { name: 'Philodendron', description: 'A diverse genus of climbing or trailing plants.', image: 'philodendron.jpg' },
      { name: 'Peperomia', description: 'A diverse genus of small, often colorful plants.', image: 'peperomia.jpg' },
      { name: 'String of Pearls', description: 'A trailing succulent with round, bead-like leaves.', image: 'string_of_pearls.jpg' },
      { name: 'Jade Plant', description: 'A succulent plant with thick, jade-green leaves.', image: 'jade_plant.jpg' },
      { name: 'Christmas Cactus', description: 'A flowering cactus that blooms around Christmas.', image: 'christmas_cactus.jpg' },
      { name: 'Bromeliad', description: 'A tropical plant with colorful bracts and often a central cup.', image: 'bromeliad.jpg' },
      { name: 'Air Plant', description: 'An epiphytic plant that absorbs nutrients from the air.', image: 'air_plant.jpg' },
      { name: 'Venus Flytrap', description: 'A carnivorous plant that traps insects.', image: 'venus_flytrap.jpg' }
    ];

    // Create the sample plants in the database
    await Plant.deleteMany({}); // Clear existing plants (optional)
    await Plant.insertMany(initialPlants);

    console.log('Seed data inserted successfully');
    process.exit(0); 
  })
  .catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1); 
  });
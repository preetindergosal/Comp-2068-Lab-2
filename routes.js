const express = require('express');
const app = express();

// Import our Page Routes
const pageRoutes = require('./routes/pages');
const moviesRoutes = require('./routes/movies');

// Register our Page Routes with our app
app.use('/', pageRoutes);
app.use('/movies', moviesRoutes);

// Export our changes
module.exports = app;
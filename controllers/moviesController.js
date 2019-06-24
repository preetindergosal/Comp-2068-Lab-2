const Movie = require('../models/movie');

exports.new = (req, res) => {
  res.render('movies/new', {
    title: 'New Movie Post'
  });
};

exports.index = (req, res) => {
  Movie.find()
    .then(movies => {
      res.render('movies/index', {
        movies: movies,
        title: 'Archive'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};

exports.show = (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('movies/show', {
        title: movie.title,
        movie: movie
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/movies');
    });
};

exports.create = (req, res) => {
  console.log("You are here");
  Movie.create(req.body.movie)
    .then(() => {
      req.flash('success', 'Your new movie was added successfully.');
      res.redirect('/movies');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.render('movies/new', {
        movie: req.body.movie,
        title: 'New Movie'
      });
    });
};

exports.drafts = (req, res) => {
  Movie.find().drafts()
    .then(drafts => {
      res.render('movies/index', {
        title: 'Drafts',
        movies: drafts
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/movies');
    });
};

exports.published = (req, res) => {
  Movie.find().published()
    .then(published => {
      res.render('movies/index', {
        title: 'Published',
        movies: published
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/movies');
    });
};

exports.edit = (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('movies/edit', {
        title: `Edit ${movie.title}`,
        movie: movie
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/movies');
    });
};

exports.update = (req, res) => {
  Movie.updateOne({
      _id: req.body.id
    }, req.body.movie, {
      runValidators: true
    })
    .then(() => {
      req.flash('success', 'Your movie was updated successfully.');
      res.redirect('/movies');
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.render('movies/edit', {
        movie: req.body.movie,
        title: `Edit ${req.body.movie.title}`
      });
    });
};

exports.destroy = (req, res) => {
  Movie.deleteOne({
      _id: req.body.id
    })
    .then(() => {
      req.flash('success', 'Your movie was deleted successfully.');
      res.redirect("/movies");
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/movies');
    });
};
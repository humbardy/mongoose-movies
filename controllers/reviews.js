const Movie = require('../models/movie');

module.exports = {
  create,
  edit
};

function create(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    movie.reviews.push(req.body);
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}

function edit(req, res) {
  Movie.findById(req.params.mId, function(err, movie) {
    let review = movie.reviews.id(req.params.rId)
    res.render('reviews/edit', {title: 'Edit a Review', movie, review })
  })
}
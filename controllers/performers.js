const Performer = require('../models/performer');
const Movie = require('../models/movie');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Performer.create(req.body, function (err, performer) {
    res.redirect('/performers/new');
  });
}

function newPerformer(req, res) {
  Performer.find({}, function (err, performers) {
    res.render('performers/new', {
      title: 'Add Performer',
      performers
    });
  })
}

function addToCast(req, res) {
  // find the movie in question
  Movie.findById(req.params.id, function(err, movie) {
    if (err) console.log(err)
    console.log(req.body.performerId)
    // add the performerId to the movie cast array
    movie.cast.push(req.body.performerId)
    
    // save the movie obj back to the db
    movie.save(function(err) {
      if (err) console.log(err)
      res.redirect('/movies/' + movie.id)
    })
  })


  // redirect to the details page
}
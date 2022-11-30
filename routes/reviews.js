const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/movies/:id/reviews', reviewsCtrl.create);
router.get('/movies/:mId/reviews/:rId', reviewsCtrl.edit)

module.exports = router;
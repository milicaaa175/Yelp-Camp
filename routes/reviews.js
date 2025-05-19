const express = require('express');
const reviews = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const router = express.Router({mergeParams: true});

router.post('/', isLoggedIn, validateReview, reviews.new);

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviews.delete);

module.exports = router;
const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const { validateReview, isLoggin, isReviewAuthor } = require('../middleware');

router.post('/', isLoggin, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggin, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
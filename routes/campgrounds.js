const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggin, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggin, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggin, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggin, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggin, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggin, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
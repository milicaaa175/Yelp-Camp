const express = require('express');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary/index');

const upload = multer({ storage })

const router = express.Router();

router.route('/')
    .get(campgrounds.index)
    .post(isLoggedIn, upload.array('images'), validateCampground, campgrounds.new);

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.get('/:id/edit', isLoggedIn, isAuthor, campgrounds.renderEditForm);

router.route('/:id')
    .put(isLoggedIn, isAuthor, upload.array('images'), validateCampground, campgrounds.edit)
    .delete(isLoggedIn, isAuthor, campgrounds.delete)
    .get(campgrounds.show);

module.exports = router;
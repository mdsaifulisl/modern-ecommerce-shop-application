const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  getAllMedia,
  addMedia,
  updateMedia,
  deleteMedia
} = require('../controllers/mediaController');

// @route   GET /api/media
// @desc    Get all slider and gallery items
router.get('/', getAllMedia);

// @route   POST /api/media
// @desc    Add new media (Slider/Gallery) with image upload
router.post('/', upload.single('image'), addMedia);

// @route   PUT /api/media/:id
// @desc    Update media details (Title/Type)
router.put('/:id', upload.single('image'), updateMedia);

// @route   DELETE /api/media/:id
// @desc    Remove media from MySQL and storage
router.delete('/:id', deleteMedia);

module.exports = router;
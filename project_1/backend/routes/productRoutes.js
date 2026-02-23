const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');


router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', upload.single('image'), addProduct);
router.put('/:id', upload.single('image'), updateProduct);
// @route   DELETE /api/products/:id
// @desc    Remove a product from MySQL
router.delete('/:id', deleteProduct);

module.exports = router;
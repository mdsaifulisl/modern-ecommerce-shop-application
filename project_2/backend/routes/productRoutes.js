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
router.post('/', upload.array('images', 10), addProduct); // ✅ multiple images
router.put('/:id', upload.array('images', 10), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// @desc    Get all products
// @route   GET /api/products

const frontendUrl = process.env.BASE_URL || 'http://localhost:8000';

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']]
    });

    // Map each product to include frontend-ready image URL
    const productsWithUrl = products.map(p => ({
      ...p.toJSON(),
      image: p.image ? `${frontendUrl}${p.image}` : null
    }));

    res.status(200).json(productsWithUrl);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// @desc    Get single product
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id); // ✅ id

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productWithUrl = {
      ...product.toJSON(),
      image: product.image ? `${frontendUrl}${product.image}` : null
    };

    res.status(200).json(productWithUrl);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// @desc    Add new product
// @route   POST /api/products


// Add product
exports.addProduct = async (req, res) => {
  try {
    const { productName, category, price, discount_price, stock, description, sizes } = req.body;

    // Save only relative path in DB
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = await Product.create({
      productName,
      category, 
      price,
      discount_price: discount_price || 0,
      stock,
      description,
      image: imagePath,
      sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes
    });

    // For frontend URL
    const productWithUrl = {
      ...newProduct.toJSON(),
      image: newProduct.image ? `${frontendUrl}${newProduct.image}` : null
    };

    res.status(201).json(productWithUrl);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating product", error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { productName, category, price, discount_price, stock, description, sizes } = req.body;

    let imagePath = product.image; // keep old image
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // save relative path

      // Delete old image file
      if (product.image) {
        const oldImagePath = path.join(__dirname, '..', product.image); // correct filesystem path
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
    }

    await product.update({
      productName,
      category,
      price,
      discount_price: discount_price || 0,
      stock,
      description,
      image: imagePath,
      sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes
    });

    const updatedProduct = {
      ...product.toJSON(),
      image: product.image ? `${frontendUrl}${product.image}` : null
    };

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating product", error: error.message });
  }
};


// @desc    Delete product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Remove the image file from server folder before deleting record
    if (product.image) {
      const fullPath = path.join(__dirname, '..', product.image);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
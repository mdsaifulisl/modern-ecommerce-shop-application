const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

const frontendUrl = process.env.BASE_URL || 'http://localhost:8000';

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    const productsWithUrl = products.map(p => {
      const data = p.toJSON();
      data.images = data.images?.map(img => `${frontendUrl}${img}`) || [];
      return data;
    });
    res.status(200).json(productsWithUrl);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const data = product.toJSON();
    data.images = data.images?.map(img => `${frontendUrl}${img}`) || [];
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Add product
exports.addProduct = async (req, res) => {
  try {
    const { productName, category, price, discount_price, stock, description, sizes } = req.body;
    const images = req.files?.map(file => `/uploads/${file.filename}`) || [];

    const newProduct = await Product.create({
      productName,
      category,
      price,
      discount_price: discount_price || 0,
      stock,
      description,
      sizes: sizes ? (typeof sizes === 'string' ? JSON.parse(sizes) : sizes) : [],
      images
    });

    const productWithUrl = {
      ...newProduct.toJSON(),
      images: newProduct.images?.map(img => `${frontendUrl}${img}`) || []
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
    let images = product.images || [];

    // Replace images if new ones uploaded
    if (req.files?.length > 0) {
      images.forEach(img => {
        const oldPath = path.join(__dirname, '..', img);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      });
      images = req.files.map(file => `/uploads/${file.filename}`);
    }

    await product.update({
      productName,
      category,
      price,
      discount_price: discount_price || 0,
      stock,
      description,
      sizes: sizes ? (typeof sizes === 'string' ? JSON.parse(sizes) : sizes) : [],
      images
    });

    const updatedProduct = {
      ...product.toJSON(),
      images: images.map(img => `${frontendUrl}${img}`)
    };
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating product", error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.images?.length > 0) {
      product.images.forEach(img => {
        const fullPath = path.join(__dirname, '..', img);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

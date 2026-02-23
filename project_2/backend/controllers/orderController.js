// Import specific files instead of the whole folder
// const Order = require('../models/Order');
// const OrderItem = require('../models/OrderItem');
// const Product = require('../models/Product');
// const { sequelize } = require('../config/db');
// Change this:
// const Order = require('../models/Order');

// To this:
const { Order, OrderItem, Product, sequelize } = require("../models/index");
const { v4: uuidv4 } = require("uuid");

exports.createOrder = async (req, res) => {
  const { customer, items, subtotal, shippingCost, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  const t = await sequelize.transaction();

  try {
    const order = await Order.create(
      {
        _id: uuidv4(),
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        location: customer.location,
        subtotal,
        shippingCost,
        total,
        status: "Pending",
      },
      { transaction: t },
    );

    // 2. Process items
    for (const item of items) {
      // Use item._id (the ID of the product from your frontend cart)
      const product = await Product.findOne({
        where: { _id: item.id },
        transaction: t,
      });

      console.log("ITEM FROM FRONTEND:", item);
      console.log("FOUND PRODUCT:", product?._id);

      if (!product) {
        throw new Error(`Product not found (ID: ${item.id})`);
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.productName}. Available: ${product.stock}`,
        );
      }

      // Deduct stock
      product.stock -= item.quantity;
      await product.save({ transaction: t });

      // 3. Create OrderItem
      // We give the OrderItem its own UUID _id as well
      await OrderItem.create(
        {
          _id: uuidv4(),
          orderId: order._id,
          productId: product._id,
          productName: product.productName,
          price: item.price,
          quantity: item.quantity,
          size: item.size || "N/A",
          image: item.image,
        },
        { transaction: t },
      );
    }

    // Success! Save all changes to MySQL
    await t.commit();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    // Failure! Undo everything so no stock is lost and no partial order is saved
    await t.rollback();
    console.error("Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Order failed",
    });
  }
};

// @desc    Get all orders with their items
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: "orderItems", // This must match the index.js association
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("DETAILED ERROR:", error); // Look at your terminal for this!
    res.status(500).json({ message: error.message });
  }
};


exports.veryfyOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};






exports.updateOrderStatus = async (req, res) => {
  const { status: newStatus } = req.body;
  const t = await sequelize.transaction();

  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: "orderItems" }],
      transaction: t,
    });

    if (!order) {
      await t.rollback();
      return res.status(404).json({ message: "Order not found" });
    }

    const oldStatus = order.status;

    const ACTIVE = ["Pending", "Processing", "Shipped"];
    const INACTIVE = ["Cancelled", "Returned"];

    // ➕ stock ফেরত
    if (ACTIVE.includes(oldStatus) && INACTIVE.includes(newStatus)) {
      for (const item of order.orderItems) {
        const product = await Product.findByPk(item.productId, {
          transaction: t,
        });

        if (product) {
          product.stock += item.quantity;
          await product.save({ transaction: t });
        }
      }
    }

    // ➖ stock আবার কমানো
    if (INACTIVE.includes(oldStatus) && ACTIVE.includes(newStatus)) {
      for (const item of order.orderItems) {
        const product = await Product.findByPk(item.productId, {
          transaction: t,
        });

        if (!product || product.stock < item.quantity) {
          throw new Error("Insufficient stock to re-activate order");
        }

        product.stock -= item.quantity;
        await product.save({ transaction: t });
      }
    }

    order.status = newStatus;
    await order.save({ transaction: t });

    await t.commit();
    res.json({ success: true, order });
  } catch (error) {
    await t.rollback();
    console.error("Update Order Status Error:", error);
    res.status(500).json({ message: error.message });
  }
};








const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const history = require("connect-history-api-fallback");
const { connectDB, sequelize } = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const contactRoutes = require("./routes/contactRoutes");
const visitRoutes = require("./routes/visitRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API routes (সবচেয়ে আগে)
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/auth", authRoutes);
app.get('/api/health', (req, res) => { res.json({ status: 'OK' }); });

// ✅ React SPA fallback
app.use(history());

// ✅ React static build
app.use(express.static(path.join(__dirname, "dist")));


// DB + Server
const startServer = async () => {
  await connectDB();
  await sequelize.sync({ force: false });
  console.log("✅ Database & tables synced");
};

startServer();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

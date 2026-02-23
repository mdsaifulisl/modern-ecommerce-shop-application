const express = require("express");
const router = express.Router();
const { submitContactForm, getAllMessages, deleteMessage, markAsRead } = require("../controllers/contactController");

// Public route: Sending the message
router.post("/", submitContactForm);

// Admin route: Reading the messages (Add your Auth middleware here!)
router.get("/", getAllMessages);
router.patch("/read/:id", markAsRead);
router.delete("/:id", deleteMessage);

module.exports = router;
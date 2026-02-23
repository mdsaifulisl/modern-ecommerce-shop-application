const Contact = require("../models/Contact");

// @desc    Submit a contact form
// @route   POST /api/contacts
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    if (!name || !email || !subject || !message || !phone) {
      console.error("Missing required fields");
    }

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
      number: phone,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newContact,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.error(error);
  }
};

// @desc    Get all messages (for the Inbox)
// @route   GET /api/contacts
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll({
      order: [["createdAt", "DESC"]], // Newest first
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/contactController.js
exports.markAsRead = async (req, res) => {
  try {
    const message = await Contact.findByPk(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    message.status = "read";  // update status
    await message.save();

    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// @desc    Delete a message
// @route   DELETE /api/contacts/:id
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const message = await Contact.findByPk(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await message.destroy();

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (error) {
    console.error("Delete message error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting message",
    });
  }
};



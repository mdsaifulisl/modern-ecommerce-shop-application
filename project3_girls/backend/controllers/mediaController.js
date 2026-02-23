const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');

const frontendUrl = process.env.BASE_URL || 'http://localhost:8000';


// @desc    Get all media
exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.findAll({ order: [['createdAt', 'DESC']] });
    
    const mediaWithUrl = media.map(m => {
      const item = m.toJSON();
      return {
        ...item,
        // Convert backslashes to forward slashes and ensure full URL
        imageUrl: item.imageUrl 
          ? `${frontendUrl}/${item.imageUrl.replace(/\\/g, '/')}` 
          : null
      };
    });
    
    res.json(mediaWithUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Add Media
exports.addMedia = async (req, res) => {
  try {
    const { title, type } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    // Save the relative path (e.g., "uploads/filename.jpg")
    // We replace backslashes with forward slashes for URL compatibility
    const filePath = req.file.path.replace(/\\/g, '/');

    const newMedia = await Media.create({ 
      title, 
      type, 
      imageUrl: filePath, 
      public_id: req.file.filename,
    });

    // Return the object with the full URL immediately so the UI updates correctly
    const result = newMedia.toJSON();
    result.imageUrl = `${frontendUrl}/${filePath}`;

    res.status(201).json({ 
      data: result, 
      message: "Media added successfully" 
    });
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Update Media (Returns updated object for Context sync)
// @route   PUT /api/media/:id
exports.updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    await Media.update({ title }, { where: { _id: id } });
    
    const updatedMedia = await Media.findByPk(id);
    
    if (!updatedMedia) {
      return res.status(404).json({ error: "Media not found" });
    }

    // Return the object with the URL transformed so the frontend doesn't break
    const result = updatedMedia.toJSON();
    result.imageUrl = result.imageUrl ? `${frontendUrl}/${result.imageUrl.replace(/\\/g, '/')}` : null;

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete Media & File
exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const mediaItem = await Media.findByPk(id);
    
    if (!mediaItem) {
      return res.status(404).json({ error: "Media not found" });
    }

    // 1. Delete the physical file from the server
    if (mediaItem.imageUrl) {
      // process.cwd() ensures we start from the project root
      // replace(/\\/g, '/') handles Windows vs Linux path issues
      const relativePath = mediaItem.imageUrl.replace(/\\/g, '/');
      const fullPath = path.join(process.cwd(), relativePath);

      console.log("Attempting to delete file at:", fullPath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log("File deleted from server.");
      } else {
        console.warn("File not found on server, only deleting database record.");
      }
    }

    // 2. Delete record from Database
    await mediaItem.destroy();
    
    res.json({ message: "Media and file deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const multer = require('multer');
const path = require('path');

// 1. Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Files will be saved in the 'uploads' folder
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Create a unique filename: fieldname-timestamp.extension
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// 2. Check File Type (Validation)
const checkFileTypes = (file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only! (jpeg, jpg, png, webp)'));
  }
};

// 3. Initialize Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit: 2MB
  fileFilter: (req, file, cb) => {
    checkFileTypes(file, cb);
  }
});

module.exports = upload;
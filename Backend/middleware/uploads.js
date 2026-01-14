const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  if (allowedTypes.test(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

const uploadProjectImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = uploadProjectImages;

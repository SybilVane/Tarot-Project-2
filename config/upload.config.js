const multer = require('multer');

// Local upload
const localUpload = multer({ dest: './public/uploads/' });

// CDN upload
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv/config');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({ cloudinary });
const CDNupload = multer({ storage });

module.exports = { CDNupload, localUpload };

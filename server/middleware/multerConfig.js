import multer from 'multer';

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // File name format
  }
});

// Create multer instance with the storage configuration
const upload = multer({ storage: storage });

export default upload;

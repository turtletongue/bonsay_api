import { diskStorage } from 'multer';
import { join, extname } from 'path';

export const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, '..', '..', 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname));
  },
});

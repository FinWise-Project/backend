import ClientError from '../exceptions/client-error.js';
import { upload } from '../services/documents/storage/storage-config.js';
import multer from 'multer';

const uploadDocumentMiddleware = (req, res, next) => {
  upload.single('document')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new ClientError('File size exceeds 5MB limit', 413));
      }
    }

    if (err) return next(err);
    next();
  });
}

export default uploadDocumentMiddleware;
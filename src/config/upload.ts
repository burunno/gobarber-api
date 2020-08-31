import multer from 'multer';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

const tempFolder = resolve(__dirname, '..', '..', 'temp');

export default {
  directory: tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, cb) {
      const fileHash = randomBytes(10).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};

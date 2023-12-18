import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from "fs";

export const filevalidation = {
  image: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
  file: ["application/pdf", "application/msword"],
};

export function uploadfile(custompath = "general", customvalidation = []) {
  const fullpath = path.join(__dirname, `../uploads/${custompath}`);
  if (!fs.existsSync(fullpath)) {
    fs.mkdirSync(fullpath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fullpath);
    },
    filename: (req, file, cb) => {
      const suffexname = nanoid() + "-" + file.originalname;
      file.dest = `uploads/${custompath}/${suffexname}`;
      cb(null, suffexname);
    },
  });

  function fileFilter(req, file, cb) {
    if (customvalidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("in-valid format", false);
    }
  }

  const uploads = multer({ fileFilter, storage });
  return uploads;
}

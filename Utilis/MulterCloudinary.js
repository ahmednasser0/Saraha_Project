import multer from "multer";

export const filevalidation = {
  image: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
  file: ["application/pdf", "application/msword"],
};

export function uploadfile(customvalidation = []) {
  const storage = multer.diskStorage({});

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

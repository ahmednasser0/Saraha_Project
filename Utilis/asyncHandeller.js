export const asynchandeller = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      return next(new Error(error, { cause: 500 }));
    });
  };
};

export const GlobalErrorHandling = (err, req, res, next) => {
  if (err) {
    if (process.env.MOOD == "dev") {
      return res
        .status(err.cause || 500)
        .json({ Message: err.message, err, stack: err.stack });
    }
    return res.status(err.cause || 500).json({ Message: err.message, err });
  }
};

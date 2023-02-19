export const validator = (schema) => (req, res, next) => {
  const { body } = req;
  const { error } = schema.safeParse(body);
  if (error) {
    const errors = error.errors.map((error) => error.message);
    req.flash("error", errors);
    return res.status(400).redirect(req.originalUrl);
  }
  return next();
};

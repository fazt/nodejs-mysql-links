export const validator = (schema) => (req, res, next) => {
  const { error } = schema.safeParse(req.body);
  if (error) {
    const errors = error.errors.map((error) => error.message);
    req.flash("error", errors);
    return res.status(400).redirect(req.originalUrl);
  }
  return next();
};

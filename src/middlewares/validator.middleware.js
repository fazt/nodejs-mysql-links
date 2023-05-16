export const validator = (schema) => async (req, res, next) => {
  const { error } = schema.safeParse(req.body);
  if (error) {
    const errors = error.errors.map((error) => error.message);
    await req.setFlash("error", errors);
    return res.status(400).redirect(req.originalUrl);
  }
  return next();
};

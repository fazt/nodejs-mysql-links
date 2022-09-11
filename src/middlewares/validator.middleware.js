import { validationResult } from 'express-validator';

export const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array().map(error => error.msg));
        return res.status(400).redirect(req.originalUrl);
    }
    next();
}

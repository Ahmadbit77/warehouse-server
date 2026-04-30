import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    const error = new Error('No token provided');
    error.status = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    const error = new Error('Invalid or expired token');
    error.status = 401;
    next(error);
  }
};

export default requireAuth;
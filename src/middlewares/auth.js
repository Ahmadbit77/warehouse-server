import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // gets token from "Bearer <token>"

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now every route can access req.user
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default requireAuth;

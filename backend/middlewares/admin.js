import User from "../models/User.js";

  export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.id); // Assuming you have user ID in req.user
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
  };
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authentication Middleware
// Authentication Middleware
exports.isAuth = (req, res, next) => {
    try {
      let token =
        req.cookies?.token || req.body?.token || req.header("Authorization");
  
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token missing",
        });
      }
  
      // If token starts with "Bearer ", strip it
      if (token.startsWith("Bearer ")) {
        token = token.slice(7); // Remove "Bearer "
      }
  
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // Attach user info to req
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Token is invalid",
        });
      } 
  
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authentication error",
      });
    }
  };
  

// Student Role Middleware
exports.isStudent = (req, res, next) => {
    try {
        if (req.user?.role !== "Student") {
            return res.status(403).json({
                success: false,
                message: "Access denied: Students only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Role check failed",
        });
    }
};

// Admin Role Middleware
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user?.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied: Admins only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Role check failed",
        });
    }
};

// Admin Role Middleware
exports.isTeacher = (req, res, next) => {
  try {
      if (req.user?.role !== "Teacher") {
          return res.status(403).json({
              success: false,
              message: "Access denied: Teachers only",
          });
      }
      next();
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Role check failed",
      });
  }
};

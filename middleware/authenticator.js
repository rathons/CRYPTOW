const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/users');

exports.protect = async (req, res, next) => {
    let token;
    //Checking for token
    if (req.headers.authorization && req.headers.authorization.startsWith("Token")) {
      token = req.headers.authorization.split(" ")[1];
       }       
    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
      }
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifying token  
        const user = await User.findById(decoded.id);    
        if (!user) {
          return next(new ErrorResponse("No user found with this id", 404));
        }        
        req.user = user;

        next();        
        res.status(200).json({
          sucess: true,
          data:user.username
      });
      } catch (err) {
        console.log(`Error ${err}`)
        return next(new ErrorResponse("Not authorized to access this router", 401));
      }
};
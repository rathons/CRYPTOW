const crypto = require('crypto');
const User = require('../models/users');
const ErrorResponse = require('../utils/errorResponse');
const emailSender = require('../utils/emailSender');

exports.register = async (req, res, next) => {
    const {username, email, phone, password} = req.body;
    try {
        const user = await User.create({
            username, email, phone, password
        });
        passToken(user, 201, res);
    } catch(err) {        
            next(err);        
    }
};

exports.signin = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return next( new ErrorResponse("Please provide an email and password", 400))
    }
    try{
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorResponse("User not Found", 401))
        }
        const isMatched = await user.matchPassword(password);

        if(!isMatched) {
            return next(new ErrorResponse("Password is incorrect", 401))
        }
        passToken(user, 200, res);

    }catch(err){        
            next(err);        
    }
};

exports.forgotPassword = async (req, res, next) => {
    const {email} = req.body;
    try {
        const userFetched = await User.findOne({email});
              
        if(!userFetched){
            return next(new ErrorResponse("Email not found on our Database", 404))
        }
                 
        const resetToken = userFetched.getResetPassToken();            
        await userFetched.save();
        
        const resetUrl = `http://localhost:3000/resetpass/${resetToken}`;
        const message =`<h1>You have requested a password reset</h1>
        <p>Please refer the link below to reset your password</p>
        <a href='${resetUrl}' clicktracking=on>Click here to reset</a>`
        

        try {
            await emailSender({
                to:userFetched.email,
                subject: "Password Reset Request",
                text: message
            })
            res.status(200).json({success:true, data:"Email sent"})
        }catch(err){
            user.resetPassToken = undefined;
            user.resetPasswordExpire = undefined;            
            await userFetched.save();
            return next(new ErrorResponse("Email could not be sent", 500))
        }
        
    } catch(error) {        
            next(error);        
    }
};

exports.resetPassword = async (req, res, next) => {
    const resetPassToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
        try{
        const user = await User.findOne({
            resetPassToken,
            resetPasswordExpire: { $gt: Date.now()}
        });
        if(!user){
            return next(new ErrorResponse("Token Expired", 400))
        }

        user.password = req.body.password;
        user.resetPassToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({success:true, data:"Password has been reset"});

    }catch(err){
        next(err);
    }
};

const passToken = (user, statusCode, res) => {
    const token = user.getAuthToken();
    res.status(statusCode).json({success:true, token})
};
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
        const message =`<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #152131;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#152131"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #152131; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                              <a href="#" title="logo" target="_blank">
                                <img width="250" src="/client/src/component/header/logo.3e3c6cd7.gif" title="logo" alt="CryptoW">
                              </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                requested to reset your password</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                We cannot simply send you your old password. A unique link to reset your
                                                password has been generated for you. To reset your password, click the
                                                following link and follow the instructions.
                                            </p>
                                            <a href="${resetUrl}"
                                                style="background:green;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                Password</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:#febf5a; line-height:18px; margin:0 0 0;">&copy; <strong>*URL*</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>`
        

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
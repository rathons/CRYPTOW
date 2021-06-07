const nodemailer = require('nodemailer');

//Init nodemailer 
const emailSender = (options) => {    
    const transporter = nodemailer.createTransport({
        service:process.env.EMAIL_PROVIDER,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        },
    })    
    
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html:options.text
    }
    
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        } else {
            console.log("mail sent");
        }
    });
};

module.exports = emailSender;
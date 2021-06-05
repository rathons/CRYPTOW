const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provide a username"]
    },
    email:{
        type: String,
        required: [true, "Please provide a email"],
        unique:true,
        // match:["/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/", "Please provide a valid email"]
    },
    phone:{
        type: Number,
        required: [true, "Please provide a phone number"], 
        unique:true,       
        // match:["((\+*)((0[ -]+)*|(91 )*)(\d{12}+|\d{10}+))|\d{5}([- ]*)\d{6}", "Please provide a valid email"]
    },
    date:{
        type: Date, 
        default: Date.now
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select:false
    },
    resetPassToken:String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getAuthToken = function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES});
};
UserSchema.methods.getResetPassToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPassToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + (10 * 60000); //10min     
    return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports=User;
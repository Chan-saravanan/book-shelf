const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:1,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }
});

UserSchema.pre('save', function(next){
    
    var user = this;
    
    if(user.isModified('password'))
    {
        bcrypt.genSalt(SALT_I, function(err, salt)
        {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash)
            {
                if(err) return next(err);
                user.password = hash;
                next();
            });

        });
    }
    else
    {
        next();
    }
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
    var user = this;

    bcrypt.compare(candidatePassword, user.password, function(err, isMatch){
        if(err) return callback(err);
        
        callback(null, isMatch);
    });
};

UserSchema.methods.generateToken = function(callback){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.SECRET);
    user.token = token;
    user.save(function(err, user){
        if(err) return callback(err);
        callback(null, user);
    });
};

UserSchema.statics.findByToken = function(token, callback){
    const user = this;
    jwt.verify(token, config.SECRET, function(err, decode){
        user.findOne({"_id":decode,"token":token}, function(err, user){
            if(err) return callback(err);
            callback(null, user);
        });
    });
};

UserSchema.methods.deleteToken = function(token, callback){
    var user = this;

    user.update({$unset:{token:1}},(err, user)=>{
        if(err) return callback(err);
        callback(null, user);
    });
};

const User = mongoose.model('user',UserSchema);

module.exports = {User};
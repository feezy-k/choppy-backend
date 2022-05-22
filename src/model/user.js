const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
   firstName:{
       type:String,
       trim:true,
       required:true,
       minlength:3,
       maxlength:50
   },
   lastName:{
       type:String,
       trim:true,
       required:true,
       minlength:3,
       maxlength:50
   },
   username:{
       type:String,
       trim:true,
       required:true,
       unique:true,
       index:true,
       lowercase:true
   },
   email:{
       type:String,
       required:true,
       trim:true,
       unique:true,
       lowercase:true
   },
   password:{
       type:String,
       required:true
   },
   role:{
       type:String,
       enum: ['user', 'admin'],
       default: 'user'
   },
   contact:{type:String},
   profilePic:{type:String}
    
},{ timestamps: true});


userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`;
});


userSchema.methods.generateAuthToken = function(){
   const token = jwt.sign({
       id: this._id,
       fullName:this.fullName,
       username:this.username,
       email:this.email,
       role: this.role
      }, process.env.jwtPrivateKey,{ expiresIn: '1d' });
      return token;
}


const User = mongoose.model('User',userSchema);


function validateUser(user){
    const schema = {
        firstName: Joi.string().required().min(3).max(50),
        lastName: Joi.string().required().min(3).max(50),
        username: Joi.string().required().min(3).max(255).allow('',null),
        email: Joi.string().required().min(3).max(255).email(),
        password: Joi.string().required().min(3).max(255)
    }

    return Joi.validate(user, schema);    

}



exports.User = User;
exports.validate = validateUser;
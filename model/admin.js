const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const bycrypt=require("bcryptjs");

const adminSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        // check the trim part 
        trim:true
    },
    role:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

adminSchema.methods.generateAuthTokenToken = function(){
    const admin=this;
    const token=jwt.sign({
        _id:admin._id.toString(),
    },
    process.env.JWT_SECRECT,{
        expiresIn:process.env.JWT_EXPIRE
    }
 );
 return token;
}
adminSchema.methods.toObj=function(){
    const admin=this;
    const adminObj=admin.toObject();
    delete adminObj.password;
    return adminObj;
}
adminSchema.statics.findByCredentials=async function(username,password){
    const admin=await Admin.findOne({username});
    if(!admin){
        throw new Error({message:"Admin not found"});
    }
    const isMatch=await bycrypt.compare(password,admin.password);
    if(!isMatch){
        throw new Error({message:"password dit not match"});

    }
    return admin;
}

adminSchema.pre("save",async function(next){
    const admin =this;
    const salt=await bycrypt.genSalt();
    admin.password=await bycrypt.hash(this.password,salt);
    next();
})

const Admin=mongoose.model("Admin",adminSchema);
module.exports=Admin;
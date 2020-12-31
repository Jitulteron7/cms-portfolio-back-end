// MTTA 2.0

const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");
const bycrypt=require("bycrypt");
const userSchema=new mongoose.Schema({

},
{
    timestamps:true,
    // toObject:{
    //     virtuals:true
    // }  
})

// generate authentication
userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign(
        {
            _id:user._id.toString(),
        },
        process.env.JWT_SECRECT,
        {
            expiresIn:process.env.JWT_EXPIRE
        }
   );
   return token;
}

// to return data without the password 
userSchema.methods.toObj=function(){
    const user=this;
    const userObj=user.toObject();
    delete userObj.password;
    return userObj;
}

// find the user exits or not if exits then return the user
// userSchema.static.findByCredentails=async function(email,password){
    
// } 

// before saving do this 
userSchema.pre("save",async function(next){
    const user=this;
    if(user.isModified("password")){
        user.password= await bycrypt.hash(user.password,8);
    }
    next();
 })

module.exports=User=mongoose.model("User",userSchema);
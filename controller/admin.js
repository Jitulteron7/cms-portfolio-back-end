const jwt=require("jsonwebtoken")
const Admin=require("../model/admin");

exports.AdminLogin=async (req,res,next)=>{
    const {username,password}=req.body;
    try{

        let admin=await Admin.findByCredentials(username,password);
        const jwtToken=await admin.generateAuthTokenToke();
        admin=admin.toObj()
        res.cookie("authorization",jwtToken,{
            maxAge:24*60*60*1000,
            httpOnly: true
        })
        // flash message
    }
    catch(error){
        next(error);
    }
}

// exports.adminHome_get=async (req,res,next)=>{

// }
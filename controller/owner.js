const jwt=require("jsonwebtoken");
const Admin=require("../model/admin");
exports.ownerLogin=async (req,res,next)=>{
    const {username,password}=req.body;
    console.log(typeof(username));
    const OwnerName=process.env.Owner_Name;
    const OwnerPassword=process.env.Owner_Password;
    try{
        if(OwnerName===username&&OwnerPassword===password){
            const token=jwt.sign(
                {
                    username:OwnerName,
                    password:OwnerPassword
                },
                process.env.JWT_SECRECT,
                {
                    expiresIn:process.env.JWT_EXPIRE
                }
            )
            
            console.log(token);
            
            res.cookie("authorization",token.toString(),{
                httpOnly:true,
                maxAge:24*60*60*1000,
                // maxAge:100*1000
            });

            res.json({username:username,password:null});

            
            // flash message
            
        }else{
            const err=new Error("Invalid Owner Credentails")
            err.status=403;
            throw err;
        }
    }
    catch(error){
        next(error);
    }
// {"error":true,"message":"jwt expired","route":"/admin/check/","password":null}
// {"username":"owner","password":null,"iat":1609333285,"exp":1609336885}
}

// MTTA 2.0

// exports.createAdmin=async (req,res,next)=>{
//     const {username,password,role}=req.body;
//     try{

//         let admin=await Admin.create({
//             username,
//             password,
//             role,
//         });
//         const jwtToken=await admin.generateAuthToken();
//         admin=admin.toJSON();
//         res.cookie("authorization",jwtToken,{
//             maxAge:24*60*60*60*1000,
//             httpOnly:false
//         })
//     }
//     catch(error){
//         next(error);
//     }

// }

// exports.ownerHome_get=async (req,res,next)=>{

// } 

// exports.ownerCreate_get=async (req,res,next)=>{

// } 
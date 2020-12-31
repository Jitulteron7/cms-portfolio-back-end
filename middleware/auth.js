const jwt=require("jsonwebtoken");

const Roles={
    owner:"owner",
    // 2.0
};
const adminAuth=(roleIs)=>{
    return async (req,res,next)=>{
            try{
                if(roleIs instanceof String){
                    roleIs=[roleIs];
                }
                const token=req.cookies.authorization;
                
                const adminInfo=jwt.verify(token,process.env.JWT_SECRECT);
                
                if(roleIs.includes(Roles.owner) && adminInfo.password==process.env.Owner_Password&&adminInfo.username==process.env.Owner_Name){
    
                    next()
                }
                else{
                    res.status(200).json({
                        err:"moderator is not avaliable"
                    });
                }
            }
            catch(err){
                res.status(401).json({
                    error: true,
                    message: err.message,
                });
            }
    }
}

module.exports={
    adminAuth,
    Roles
};
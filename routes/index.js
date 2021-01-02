const router=require('express').Router();
const moderatorRouter=require("./moderator");
const ownerRouter=require("./owner");
const {adminAuth,Roles}=require("../middleware/auth");
const dashBoard=require("../controller/dashBoard");
const blog=require("../controller/blog");
const jwt=require("jsonwebtoken")
// ADMIN 
// 1 moderator
// router.use("/admin",moderatorRouter);
// 2 owner
router.use("/admin",ownerRouter);

router.get("/admin/check/",async (req,res,next)=>{
            
    try{
        if(req.cookies.authorization!=null){
            const token=req.cookies.authorization;
            
            const adminInfo=jwt.verify(token,process.env.JWT_SECRECT);
            // console.log(adminInfo);
            adminInfo.password = null;
            
            if(adminInfo.message=="jwt expired"){
                
                res.end();
            }
             else{
                 res.json(adminInfo);
                }
        }
        else{
            res.json(false);
        }   
    }catch(e){
        if(e){
            res.json(false);
            console.log("error in here");
        }
        
    }
});
router.get("/admin/logout",(req,res,next)=>{
    res.clearCookie("authorization");
    res.clearCookie("connect.sid");
    // console.log(res.clearCookie());
    res.json(true);
});

// dashboard
router.get("/admin/dashboard/",adminAuth(Roles.owner),dashBoard.dashBoard);
// note both owner and moderator 
router.post("/admin/dashboard/editor",adminAuth(Roles.owner),blog.EditorPost);
router.get("/admin/dashboard/allcontents",blog.ContentGet);
router.post("/admin/dashboard/delete/content",adminAuth(Roles.owner),blog.DeteteContent);
router.post("/oneContent/view",blog.ViewContent);
router.post("/admin/dashboard/edit/content",adminAuth(Roles.owner),blog.EditContent);
// error handeling 
// router.use((error,req,res,next)=>{
//     console.error(error.message);
//     res.status(error.status||500).json({
//         error :true,
//         message :error.message||"Error",
//         route:req.url,
//     });
// })

module.exports=router;
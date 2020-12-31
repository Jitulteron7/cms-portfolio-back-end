const router =require("express").Router();
const  adminControaller=require("../controller/admin");


router.post("/moderator/login",adminControaller.AdminLogin);
// router.post("/createblog",adminControaller.)

module.exports=router;
const router =require("express").Router();
const  ownerControaller=require("../controller/owner");


router.post("/owner/login",ownerControaller.ownerLogin);
// router.post("/createblog",adminControaller.)

module.exports=router;
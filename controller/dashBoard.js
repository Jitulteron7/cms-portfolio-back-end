exports.dashBoard=async (req,res,next)=>{
    try{
        res.json({
            msg:"Dashboard"
        });
    }
    catch(err){
        next(err);
    }
}
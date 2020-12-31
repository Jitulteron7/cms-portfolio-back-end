const Blog =require("../model/blog");


exports.EditorPost= async(req,res,next)=>{
    const {title,description,banner,blogType}=req.body;
    try{
            
            let blog=new Blog({
                title,
                description,
                banner,
                blogType
            });
            
            blog.save().then(data=>{
                if(data){
                    res.json({info:true,datas:data});
                }else{
                    res.json({info:false});
                }
            }).catch(err=>{
                next(err);
            });
         
        }
    catch(err){
            next(err);
    }

};
exports.ContentGet= async(req,res,next)=>{
    try{
         Blog.find()
         .sort("-createdAt")
         .then(data=>{
             res.json({data:data});
         }).catch(err=>{
             next(err);
         })   
        }
    catch(err){
            next(err);
    }

};
exports.DeteteContent= async(req,res,next)=>{
    try{
        const {id}=req.body;
         Blog.findByIdAndRemove(id)
         .then(data=>{
             res.json({data:true});
         }).catch(err=>{
             next(err);
         })   
        }
    catch(err){
            next(err);
    }

};
exports.ViewContent= async(req,res,next)=>{
    try{
        const {id}=req.body;
         Blog.findById(id)
         .then(data=>{
             res.json({info:data});
         }).catch(err=>{
             next(err);
         })   
        }
    catch(err){
            next(err);
    }

};
exports.EditContent= async(req,res,next)=>{
    try{
        const {id,description,banner,title,blogType}=req.body;
         Blog.findByIdAndUpdate(id)
         .then(data=>{
                data.description=description;
                data.banner=banner;
                data.title=title;
                data.blogType=blogType;
                data.save();
             res.json({info:true});
         }).catch(err=>{
             next(err);
         })   
        }
    catch(err){
            next(err);
    }

};
// CqolneybDxIOedXL
// MTTA
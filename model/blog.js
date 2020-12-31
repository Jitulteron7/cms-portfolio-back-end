const mongoose=require('mongoose');
const marked=require("marked");
const {JSDOM}=require("jsdom");
const createDompurifier=require("dompurify");
const purify=createDompurifier(new JSDOM().window);


const blogSchema=new mongoose.Schema({
    // id:{
    //     type:String,
    //     required:true
    // },
    title:{
        type:String,
        // required: true
    },
    description:{
        type:String,
    },
    // timeAndDate:{
    //     type:String,
    //     required:true
    // },
    banner:{
        type:String,
        default:"https://res.cloudinary.com/jitul-teron/image/upload/v1597056735/hxolzrd8hx6q6y1kx7kd.jpg",
    },
    blogType:{
        type:String,
        // required:true
    },
    sanitizedHTML:{
        type:String,
        // required:true
    }   
},{
    timestamps:true
});

blogSchema.pre("save",function(next){
    const blog=this;
    const data=blog.description;

    if(blog.isModified("description")){
        blog.sanitizedHTML=purify.sanitize(marked(data.toString()));
    }
    next();
})

const Blog=mongoose.model("Blog",blogSchema);
module.exports = Blog;
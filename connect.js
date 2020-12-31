const mongoose=require('mongoose');
var URL="";
const PORT=5000||process.env.PORT;
const ConnectToDB=()=>{
    if(PORT===4000){
        URL="mongodb://localhost:27017/MTTA"
    }else{
        URL=process.env.MONGO_URL;
    }
    
    mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    });
    mongoose.connection.on("connected",()=>{
        if(URL===process.env.MONGO_URL){
            console.log("connected to mongoose server")
        }
        else {
            console.log("connected to local mongoose")
        }
    })
    mongoose.connection.on("error",()=>{
        console.log("Error DB");
    })

}
module.exports=ConnectToDB;
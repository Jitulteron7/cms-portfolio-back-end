require("dotenv").config();
const express=require("express")
const cors=require("cors");
const session=require("express-session");
const cookieParser=require("cookie-parser");
const app=express();
const Connect=require("./connect");
const PORT=5000||process.env.PORT;
const routes=require("./routes/index");

// middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.json());
app.use(cookieParser("secrect_passcode"));
app.use(
    session({
      secret: "secret_passcode",
      cookie: {
        maxAge:24*60*60*1000,
        // maxAge:100*1000,
        httpOnly:true
      },
      resave: false,
      saveUninitialized: true,
    })
  );

  
// router
app.use("/",routes);


// db connection
Connect();
app.listen(PORT,()=>{
    if(PORT===5000)
    {
        return   console.log("connected to "+PORT)
    }
    console.log("connected in production");
    
})
require("dotenv").config();
const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser")
const session = require("express-session")
const mongooseConnect = require("./config/config")
const nocache = require("nocache")
app.use(express.static('public'))

app.use(nocache())

app.set("view engine","ejs")
app.use(session({
    secret:"my secret",
    saveUninitialized:true,
    resave:false,
    cookie:{
        maxAge:24*60*60*1000
    }
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
 
 
const userRouter = require("./routes/userrouts")
const adminRouter= require("./routes/adminrouts")
app.use("/",userRouter)
app.use("/",adminRouter)
app.listen(port,()=>{
    console.log("Server started ");
});

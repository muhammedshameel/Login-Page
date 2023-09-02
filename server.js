const express=require('express');
const path = require('path');
const bodyparser =require("body-parser");
const session = require("express-session");
const{v4:uuidv4} = require("uuid");

const router = require('./router');
const { Cookie } = require('express-session');

const app=express();

const port=process.env.PORT||3443;

//middleware

// app.use(bodyparser.json({extended:true}))
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs')

//load static asset
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')));

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:100000
    }
}));
app.use((req,res,next)=>{   
    res.header('Cache-control','no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
   next();
    })

app.use('/route',router);


//home route
app.get('/',(req,res) => {
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.render('base',{title:"Login System"});
    }  
})
app.listen(port,() => {console.log("listenin to the server on http://localhost:3443")});
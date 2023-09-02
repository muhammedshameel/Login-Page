var express = require("express");
var router = express.Router();
const credential = {
    email:"admin@mail.com",
    password:"admin123"
};

//login user
router.post('/login',(req,res) => {
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.send("login Successful...!");
    }else if(req.body.email == "" && req.body.password==""){
        res.render('base',{title:"Login Page",logout:"Please enter useranme and password"});
    }else if(req.body.email == ""){
        res.render('base',{title:"Login Page",logout:"Please enter correct useranme"});
    }else if(req.body.password==""){
        res.render('base',{title:"Login Page",logout:"Please enter your correct password"});
    }
    else{
        res.render('base',{title:"Login Page",logout:"Invalid credentials"});
        }
});


//cards
const cards = [
    { title: 'HTML', description: 'HTML stands for Hyper Text Markup Language. HTML is the standard markup language for creating Web pages. HTML describes the structure of a Web page. HTML consists of a series of elements. HTML elements tell the browser how to display the content.', image: '/assets/html.png' },
    { title: 'Java Script', description: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.', image: '/assets/bg.png' },
    { title: 'Nodejs', description: 'Node. js (Node) is an open source, cross-platform runtime environment for executing JavaScript code. Node is used extensively for server-side programming, making it possible for developers to use JavaScript for client-side and server-side code without needing to learn an additional language.', image: '/assets/bg1.png'},
    { title: 'Express Js', description: 'Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. Its a layer built on the top of the Node js that helps manage servers and routes.', image: '/assets/bg2.png'},
    {title: 'MongoDB',description:'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas',image:'/assets/database.png'}
  ];
//route for dashboard


router.get('/dashboard',(req,res) => {
    if(req.session.user){
        res.render('dashboard',{user:req.session.user,cards});
    }else{
        res.render('base',{title:"Login Page",logout:"Current Session Expired please login back again"});
    }
})


//route for logout
router.get('/logout',(req,res) => {
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('base',{title:"Login Page",logout:"Loggedout Successfully"});
        }
    })
})

module.exports = router;
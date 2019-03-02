'use strict'
var express = require('express'),
	bodyParser = require('body-parser'),
	nodemailer = require("nodemailer"),
	app = express();

var mcache = require('memory-cache');
const compression = require('compression');
app.use(compression());

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.get('/',cache(10), (req,res)=>{
  setTimeout(() => {
	res.render('particles.min.ejs');
}, 5000)
});

app.post('/contact', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "dk1228095136@gmail.com",
      pass: process.env.GMAILPASSWORD
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: "dk122809@gmail.com",
    subject: 'New message from contact form at deepak portfolio',
    text: `   

    Name of client: ${req.body.name} 


   	Email id of client: (${req.body.email})


   	Subject  of message: (${req.body.subject})


    Message of client: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
    	console.log(error);
        res.redirect("/");
    }
    else {
      res.redirect("/");
    }
  });
});
app.use(function (req, res) {
    res.status(404).render('error');
});
// app.listen(3000, function(){
// 	console.log("server started at port 3000");
// });


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("server started at port ");
});
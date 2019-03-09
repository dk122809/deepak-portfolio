'use strict'
var express = require('express'),
	bodyParser = require('body-parser'),
	nodemailer = require("nodemailer"),
	app = express();


const compression = require('compression');
app.use(compression());

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nAllow: /\nsitemap: https://stark-bastion-20221.herokuapp.com/sitemap.xml");
});

var path = require("path");
app.get('/sitemap.xml', function(req, res) {
  res.sendFile(path.join(__dirname, 'path', 'sitemap.xml'));
});

app.get('/', (req,res)=>{
	res.render('particles.min.ejs');
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

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("server started at port ");
});
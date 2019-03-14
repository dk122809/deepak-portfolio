'use strict'
var express = require('express'),
	bodyParser = require('body-parser'),
	nodemailer = require("nodemailer"),
	app = express();

var mcache = require('memory-cache');
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

app.get('/',cache(10), (req,res)=>{
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
    html: `   

      <table data-module="main-a" data-thumb="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2016/06/07/qQV5bIk0ApBj8ONDvlPyh6JH/preview/thumbnails/main-a.png" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" class="currentTable">
      <tbody><tr>
        <td align="center">
          <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
            <tbody><tr>
              <td data-bgcolor="Main BG" data-bg="Main BG" align="center" bgcolor="#333333" background="img/bg-main-a.jpg" style="background-image: url(http://www.stampready.net/dashboard/editor/user_uploads/image_uploads/2016/06/07/GkRb9xMBSZnd3VvjYcr71z24Q5Xpft8J.jpg); background-size: cover; background-position: center;">
                <table class="table600" width="600" align="center" border="0" cellpadding="0" cellspacing="0">

                  <tbody><tr>
                    <td height="150" style="font-size: 1px; line-height: 150px;">&nbsp;</td>
                  </tr>

                  <tr>
                    <td data-color="Main Subheadline" data-size="Main Subheadline" align="center" style="font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700; color: #ffffff; line-height: 24px; letter-spacing: 2px;">
                      <img src="https://i.ibb.co/3ccZ7Nb/logo.png" alt="deepak portfolio">
                    </td>
                  </tr>

                  <tr>
                    <td height="25" style="font-size: 1px; line-height: 25px;">&nbsp;</td>
                  </tr>                 

                  <tr>
                    <td data-color="Main Headline" data-size="Main Headline" align="center" style="font-family: 'Poppins', sans-serif; font-size: 42px; font-weight: 700; color: #ffffff; line-height: 48px; letter-spacing: 4px;" contenteditable="false" class="editable">
                      NEW MESSAGE FROM DEEPAK PORTFOLIO
                    </td>
                  </tr>

                  <tr>
                    <td height="25" style="font-size: 1px; line-height: 25px;">&nbsp;</td>
                  </tr>

                  <tr>
                    <td data-color="Main Content" data-size="Main Content" align="center" style="font-family: 'Open Sans', sans-serif; font-size: 14px; font-weight: 400; color: #ffffff; line-height: 28px;" contenteditable="true" class="editable">
                      Name of client: ${req.body.name}
                    </td>
                  </tr> 
                   <tr>
                    <td data-color="Main Content" data-size="Main Content" align="center" style="font-family: 'Open Sans', sans-serif; font-size: 14px; font-weight: 400; color: #ffffff; line-height: 28px;" contenteditable="true" class="editable">
                      Email id of client: ${req.body.email}
                    </td>
                  </tr> 
                   <tr>
                    <td data-color="Main Content" data-size="Main Content" align="center" style="font-family: 'Open Sans', sans-serif; font-size: 14px; font-weight: 400; color: #ffffff; line-height: 28px;" contenteditable="true" class="editable">
                     Subject  of message: ${req.body.subject}
                    </td>
                  </tr> 
                   <tr>
                    <td data-color="Main Content" data-size="Main Content" align="center" style="font-family: 'Open Sans', sans-serif; font-size: 14px; font-weight: 400; color: #ffffff; line-height: 28px;" contenteditable="true" class="editable">
                      Message of client: ${req.body.message}
                    </td>
                  </tr> 

                  <tr>
                    <td height="30" style="font-size: 1px; line-height: 30px;">&nbsp;</td>
                  </tr>         

                  <tr>
                    <td align="center">
                        <table data-border-color="Main Button" width="170" align="center" border="0" cellpadding="0" cellspacing="0" style="border: 2px solid #ffffff;">

                          <tbody><tr>
                            <td height="10" style="font-size: 1px; line-height: 10px;">&nbsp;</td>
                          </tr>

                          <tr>
                            <td align="center" style="font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: #ffffff; line-height: 24px; letter-spacing: 1px;">
                              <a href="https://tourguru.site/" style="color: #ffffff; text-decoration: none;" data-color="Main Btn Text" data-size="Main Btn Text">VISIT SITE</a>
                            </td>
                          </tr>

                          <tr>
                            <td height="10" style="font-size: 1px; line-height: 10px;">&nbsp;</td>
                          </tr>                   
                          
                        </tbody></table>
                      </td>
                    </tr>

                  <tr>
                    <td height="150" style="font-size: 1px; line-height: 150px;">&nbsp;</td>
                  </tr>

                </tbody></table>
              </td>
            </tr>
            </tbody></table>
        </td>
      </tr>
    </tbody></table>

    


    <table data-module="footer" data-thumb="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2016/06/07/qQV5bIk0ApBj8ONDvlPyh6JH/preview/thumbnails/footer.png" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" class="">
      <tbody><tr>
        <td data-bgcolor="Footer BG" align="center" bgcolor="#2a2a2a">
          <table class="table600" width="600" align="center" border="0" cellpadding="0" cellspacing="0">

            <tbody><tr>
              <td height="15" style="font-size: 1px; line-height: 15px;">&nbsp;</td>
            </tr>

            <tr>
              <td>

                <table class="full-width" width="494" align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">

                  <tbody><tr>
                    <td data-color="Footer" data-size="Footer" align="left" style="font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 400; color: #ffffff; line-height: 18px;">
                      © 2019 DEEPAK All rights reserved.
                    </td>
                  </tr>

                </tbody></table>

                <!-- SPACE -->
                  <table class="full-width" width="1" align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                    <tbody><tr>
                      <td width="1" height="5" style="font-size: 5px; line-height: 5px;"></td>
                    </tr>
                  </tbody></table>
                <!-- END SPACE -->

                <table class="full-width" width="80" align="right" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">

                  </table>

              </td>
            </tr>

            <tr>
              <td height="15" style="font-size: 1px; line-height: 15px;">&nbsp;</td>
            </tr>

          </tbody></table>
        </td>
      </tr>
    </tbody></table>


    `
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
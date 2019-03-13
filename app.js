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

      <table style="background-color: #D8D8D8; margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0; width: 100%;" cellspacing="0" cellpadding="0" border="0" bgcolor="#D8D8D8" width="100%" data-module-id="1" class="in-container ui-sortable-handle">
    <tbody><tr>
      <td align="center" valign="top">
        <table class="p100" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0; width: 800px;" width="800" cellspacing="0" cellpadding="0" border="0" align="center">
          <tbody><tr>
            <td style="background-color: #3F3E46; background-position: center center; background-size: cover;" align="center" valign="top" bgcolor="#3F3E46" background="http://www.maesto.net/themebuilder/demo/templates/Moka/html_responsive/full/images/s2-banner-image.png" data-og-background="images/s2-banner-image.png">
              <!--[if gte mso 9]>
                   <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:800px;">
                  <v:fill type="frame" src="images/s2-banner-image.png" color="#3F3E46" ></v:fill>
                  <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                  <![endif]-->
              <table class="p90" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0; width: 600px;" width="600" cellspacing="0" cellpadding="0" border="0" align="center">
                <tbody><tr>
                  <td align="center" valign="top">
                    <table class="p100" style="border-bottom: 1px solid #6F6E76; margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0; width: 600px;" width="600" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tbody><tr>
                        <td valign="top" align="left">
                          <!--[if gte mso 9]>
                               <table align="left" border="0" cellpadding="0" cellspacing="0" width="600">
                               <tr>
                               <td align="left" valign="top" width="130">
                              <![endif]-->
                          <table class="p100" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0; width: 130px;" width="130" cellspacing="0" cellpadding="0" border="0" align="left">
                            <tbody><tr>
                              <td style="height: 25px; line-height: 25px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                            </tr>
                            <tr>
                              <td align="center" valign="top">
                                <table class="p100" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0;" cellspacing="0" cellpadding="0" border="0" align="center">
                                  <tbody><tr>
                                    <td align="center" valign="top">
                                      <a href="https://tourguru.site/" style="border: none; display: block; outline: none 0px; text-decoration: none; cursor: pointer; box-sizing: content-box;">
                                        <img src="https://i.ibb.co/h16ZSTy/Untitled-1.png" alt="Image Error, check the URL" style="-ms-interpolation-mode: bicubic; border: 0; display: block; outline: 0; text-decoration: none; width: 130px;" width="130" border="0">
                                      </a>
                                    </td>
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                            <tr>
                              <td class="hide" style="height: 25px; line-height: 25px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                            </tr>
                          </tbody></table>
                          <!--[if gte mso 9]>
                               </td>
                               <td align="left" valign="top" width="110">
                              <![endif]-->
                          <table class="p100 hide" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0; width: 110px;" width="110" cellspacing="0" cellpadding="0" border="0" align="left">
                            <tbody><tr>
                              <td align="left" valign="top">&nbsp;</td>
                            </tr>
                          </tbody></table>
                          <!--[if gte mso 9]>
                               </td>
                               <td align="left" valign="top" width="360">
                              <![endif]-->
                          <table class="p100" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0; width: 360px;" width="360" cellspacing="0" cellpadding="0" border="0" align="right">
                            <tbody><tr>
                              <td class="hide" style="height: 20px; line-height: 20px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                            </tr>
                            <tr>
                              <td valign="middle" align="center">
                                <table class="p100" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0;" cellspacing="0" cellpadding="0" border="0" align="right">
                                  <tbody><tr>
                                    <td align="center" valign="top">
                                      <table class="p100" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0;" cellspacing="0" cellpadding="0" border="0" align="center">
                                        <tbody><tr>
                                          <td align="center" valign="top">
                                            <table class="xs-p100" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0;" cellspacing="0" cellpadding="0" border="0" align="center">
                                              <tbody><tr>
                                                <td align="center" valign="top">
                                                  <!--[if gte mso 9]>
                                                       <table align="right" border="0" cellpadding="0" cellspacing="0" width="340">
                                                       <tr>
                                                       <td align="left" valign="top" width="85">
                                                      <![endif]-->
                                                  <table class="xs-p50" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                    <tbody><tr>
                                                      <td style="height: 30px; line-height: 30px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                      
                                                    </tr>
                                                  </tbody></table>
                                                  <!--[if gte mso 9]>
                                                       </td>
                                                       <td align="left" valign="top" width="85">
                                                      <![endif]-->
                                                  <table class="xs-p50" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                    <tbody><tr>
                                                      <td style="height: 30px; line-height: 30px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                      
                                                    </tr>
                                                  </tbody></table>
                                                  <!--[if gte mso 9]>
                                                       </td>
                                                       <td align="left" valign="top" width="85">
                                                      <![endif]-->
                                                  <table class="xs-p50" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                    <tbody><tr>
                                                      <td style="height: 30px; line-height: 30px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                      
                                                    </tr>
                                                  </tbody></table>
                                                  <!--[if gte mso 9]>
                                                       </td>
                                                       <td align="left" valign="top" width="85">
                                                      <![endif]-->
                                                  <table class="xs-p50" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                    <tbody><tr>
                                                      <td style="height: 30px; line-height: 30px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                      
                                                    </tr>
                                                  </tbody></table>
                                                  <!--[if gte mso 9]>
                                                       </td>
                                                       </tr>
                                                      </table>
                                                      <![endif]-->
                                                </td>
                                              </tr>
                                            </tbody></table>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                            <tr>
                              <td style="height: 30px; line-height: 30px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                            </tr>
                            <tr>
                              <td class="hide" style="height: 15px; line-height: 15px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                            </tr>
                          </tbody></table>
                          <!--[if gte mso 9]>
                               </tr>
                              </table>
                              <![endif]-->
                        </td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
                <tr>
                  <td style="height: 30px; line-height: 30px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                </tr>
                <tr>
                  <td class="hide" style="height: 45px; line-height: 45px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                </tr>
                <tr>
                  
                </tr>
                <tr>
                  <td align="center" valign="top">
                    <table class="p90" style="margin: 0; mso-table-lspace: 0; mso-table-rspace: 0; padding: 0; width: 600px;" width="600" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tbody><tr>
                        <td style="height: 30px; line-height: 30px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="color: rgb(255, 255, 255); font-size: 14px; font-weight: 400; line-height: 23px; text-align: center; cursor: pointer; box-sizing: content-box; outline: none 0px;" valign="top" align="left" class="editable_text text2"><font face="'Open Sans', sans-serif">
                                Name of client: ${req.body.name} 
                        </td>
                        <td style="color: rgb(255, 255, 255); font-size: 14px; font-weight: 400; line-height: 23px; text-align: center; cursor: pointer; box-sizing: content-box; outline: none 0px;" valign="top" align="left" class="editable_text text2"><font face="'Open Sans', sans-serif">
                             
                              Email id of client: ${req.body.email}
                        </td>
                        <td style="color: rgb(255, 255, 255); font-size: 14px; font-weight: 400; line-height: 23px; text-align: center; cursor: pointer; box-sizing: content-box; outline: none 0px;" valign="top" align="left" class="editable_text text2"><font face="'Open Sans', sans-serif">
                              Subject  of message: ${req.body.subject}
                        </td>
                        <td style="color: rgb(255, 255, 255); font-size: 14px; font-weight: 400; line-height: 23px; text-align: center; cursor: pointer; box-sizing: content-box; outline: none 0px;" valign="top" align="left" class="editable_text text2"><font face="'Open Sans', sans-serif">
                              Message of client: ${req.body.message}
                        </td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
                <tr>
                  <td style="height: 40px; line-height: 40px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                </tr>
                <tr>
                  <td class="hide" style="height: 15px; line-height: 15px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                </tr>
               
                          </tbody></table>
                        </td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
                <tr>
                  <td class="hide" style="height: 30px; line-height: 30px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                </tr>
                <tr>
                  <td style="height: 45px; line-height: 45px; mso-line-height-rule: exactly;" valign="top" align="left">&nbsp;</td>
                </tr>
              </tbody></table>
              <!--[if gte mso 9]>
                   </v:textbox>
                  </v:fill>
                  </v:rect>
                  <![endif]-->
            </td>
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
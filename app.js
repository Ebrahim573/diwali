const express = require('express');
const app = new express();
const path = require('path');
var nodemailer = require("nodemailer");
const favicon = require('serve-favicon');
const port = process.env.PORT || 3000;
app.use(favicon(path.join('public', 'diwali.gif')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', {});
});


app.post('/submit', (req, res) => {
    res.render('greetings', { uname: req.body.uname, fname: req.body.fname, email: req.body.email });
    console.log(req.body.uname);
    console.log(req.body.fname);
    console.log(req.body.email);
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'unni01997@gmail.com',
            pass: 'qwertyuiop#09876'
        }
    });

    var mailOptions = {
        from: 'unni01997@gmail.com',
        to: req.body.email,
        subject: 'Happy Diwali',
        text: ` Hi ${req.body.fname}, ${req.body.uname} wishes you a happy and safe Diwali.`,
        html: `<h1 style="color:#c7ad2e;">Hi ${req.body.fname}, ${req.body.uname} wishes you a happy and safe Diwali</h1>
		<h1 style="color:#c7ad2e;">Happy Diwali</h1>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

app.listen(port, () => {
    console.log(`Server Ready on ${port}`);
});
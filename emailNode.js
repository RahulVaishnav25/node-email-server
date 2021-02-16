var cors = require('cors')
const https = require('https');
var express = require('express')
var fs = require('fs')
var app = express()

// var pathCert = "/path/"
// var privateKey = fs.readFileSync(pathCert + '/privkey.pem', 'utf8');
// var certificate = fs.readFileSync(pathCert + '/fullchain.pem', 'utf8');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '*****************@gmail.com',
        pass: '****************'
    }
});
var mailOptions = {
    from: '****************@gmail.com',
    to: 'target@domain.in',
    subject: 'New Query at company',
};

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())

app.get('/', function (request, response) {
    console.log('GET /')
    var html = `
    <html>
        <body>
            <!--<form method="post" action="http://localhost:5000">Name: 
                <input type="text" name="name" />
                <input type="submit" value="Submit" />
            </form>-->
            Working...
        </body>
    </html>`
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    response.end(html)
})

app.post('/', function (request, response) {
    console.log('POST /')

    if (request.body.type == "query") {
        mailOptions.text = 'Query by : ' + request.body.name + ' of company ' + request.body.company + '\nEmail ID : ' + request.body.email + '\nContact :' + request.body.contact + '\nQuery : ' + request.body.msg + '\n';
    } else {
        mailOptions.text = 'Name : ' + request.body.name + '\nInfo by ' + request.body.info + '\nEmail ID : ' + request.body.email + '\nContact :' + request.body.contact + '\nQuery : ' + request.body.msg + '\nCountry : ' + request.body.country + '\n';
    }
    console.dir(mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        if (error) {
            response.write('error'); //write a response to the client
            console.log(error);
        } else {
            response.write('Sent'); //write a response to the client
            console.log('Email sent: ' + info.response);
        }
        response.end('')
    });
})

port = 5000
app.listen(port)
// https.createServer(app).listen(port)
console.log(`Listening at http://localhost:${port}`)

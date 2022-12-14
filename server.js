var express = require('express');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
    app.use(function (req, res, next) {
        var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
        var origin = req.headers.origin || '*';
        if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
            console.log(origin);
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }
        next();
    });
}

app.get("/api/whoami", function (req, res) {
    var response = { ipaddress: req.ip, language: req.headers['accept-language'], software: req.headers['user-agent'] }

    res.json(response)
});


var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Node is listening on port ' + port + '...');
})
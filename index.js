const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;
const formidable = require('formidable');



app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Invalid Endpoint");
});
app.post('/homes', cors(), (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    let apiUrl = "http://od-api.newhomesource.com/api/v2/search/homes?partnerid=9326&markets=84&pagesize=1000";
    request({
        url: apiUrl,
        json: true
    }, (err, response, body) => {
        if (err) {
            return res.json({
                success: false,
                msg: 'API error'
            });
        }
        let homes = body.Result;
        let homeObjs = [];

        homes.forEach(home => {
            homeObjs.push(_.pick(home, ['CommName', 'PlanName', 'Addr', 'Price', 'Br', 'Ba', 'Sft', 'Gr']));
        });
        res.json(homeObjs);
    });

});

app.post('/uploadFile', (req, res) => {
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/files/' + file.name;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
        return res.json({
            success: true,
            msg: 'Uploaded'
        });
    });

});

app.listen(port, () => {
    console.log(`Server on ${port}`);
});
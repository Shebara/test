const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const root = 'https://dvapi.tempest.app/api/v1/';

app.use(cors({
    methods: ['GET', 'POST']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/login', (req, res) => {
    const url = root + 'auth/login';

    axios.post(url, {
        email: req.body.email,
        password: req.body.password
    }).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        res.send(error);
    });
});

/*app.get('/api/jobs/:page/:per_page', (req, res) => {
    //TODO
    axios.get(url).then(function (response) {
        res.send(response.data);
    });
});*/

app.listen(port, () => console.log(`Listening on port ${port}`));

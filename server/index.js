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

app.get('/api/jobs/:page', (req, res) => {
    const page = req.params.page;
    const url = root + `jobs?order_by=start_time&include=client.jobRequest,jobType.user&per_page=20&page=${page}`;

    axios.get(url, {
        headers: {
            Authorization: req.headers.authorization
        }
    }).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        res.send(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

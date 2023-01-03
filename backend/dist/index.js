"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.set('trust proxy', true);
app.get('/search', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let inputData = '';
    function setLocationApi(lat, lng) {
        let searchData = `term=${req.query.kWord}&radius=${Math.round(parseInt(req.query.dist) * 1609.344)}&categories=${req.query.cate}&latitude=${lat}&longitude=${lng}&limit=10`;
        inputData = searchData.toString();
        return inputData;
    }
    function getLatLng() {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.loc}&key=AIzaSyABuTYIatVnMU3kOweH45687A_TaccbNnw`);
    }
    function getYelp(inputData) {
        let api_key = 'IPkkhA08a-1lz1ZkVyN2Vu85bfLTbUJ3Zc-kzYmgdW1gNjCMtFbGC94N4JXyZVwjIgkEqvvq4RFaR0Kx905INzJMn5_ywPWSAldQ-1wLvDaGMmo4vTS3kvPPrPsrY3Yx';
        return fetch(`https://api.yelp.com/v3/businesses/search?${inputData}`, { headers: { Authorization: `Bearer ${api_key}` } });
    }
    if (req.query.loc != undefined) {
        getLatLng().then(function (response) {
            response.json().then((data) => {
                if (data.results[0] == undefined) {
                    res.json(data);
                    return;
                }
                let mylat = data.results[0].geometry.location.lat;
                let mylng = data.results[0].geometry.location.lng;
                setLocationApi(mylat, mylng);
                getYelp(inputData).then(function (response) {
                    response.json().then((data) => {
                        res.json(data);
                    });
                });
            });
        });
    }
    if (req.query.cB != undefined) {
        let latlng = req.query.cB.split(',');
        setLocationApi(latlng[0], latlng[1]);
        getYelp(inputData).then(function (response) {
            response.json().then((data) => {
                console.log('the result is ', data);
                res.json(data);
            });
        });
    }
});
app.get('/search/autocomplete', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let api_key = 'IPkkhA08a-1lz1ZkVyN2Vu85bfLTbUJ3Zc-kzYmgdW1gNjCMtFbGC94N4JXyZVwjIgkEqvvq4RFaR0Kx905INzJMn5_ywPWSAldQ-1wLvDaGMmo4vTS3kvPPrPsrY3Yx';
    console.log('backend get ', req.query.word);
    fetch(`https://api.yelp.com/v3/autocomplete?text=${req.query.word}`, { headers: { Authorization: `Bearer ${api_key}` } })
        .then(function (response) {
        response.json().then((data) => {
            console.log('the autocomplete is ', data);
            res.json(data);
        });
    });
});
app.get('/search/businessesDetail', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let api_key = 'IPkkhA08a-1lz1ZkVyN2Vu85bfLTbUJ3Zc-kzYmgdW1gNjCMtFbGC94N4JXyZVwjIgkEqvvq4RFaR0Kx905INzJMn5_ywPWSAldQ-1wLvDaGMmo4vTS3kvPPrPsrY3Yx';
    console.log('backend get ', req.query.word);
    fetch(`https://api.yelp.com/v3/businesses/${req.query.id}`, { headers: { Authorization: `Bearer ${api_key}` } })
        .then(function (response) {
        response.json().then((data) => {
            console.log('the businessesDetail is ', data);
            res.json(data);
        });
    });
});
app.get('/search/review', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let api_key = 'IPkkhA08a-1lz1ZkVyN2Vu85bfLTbUJ3Zc-kzYmgdW1gNjCMtFbGC94N4JXyZVwjIgkEqvvq4RFaR0Kx905INzJMn5_ywPWSAldQ-1wLvDaGMmo4vTS3kvPPrPsrY3Yx';
    // console.log('backend get ', req.query.word)
    fetch(`https://api.yelp.com/v3/businesses/${req.query.id}/reviews`, { headers: { Authorization: `Bearer ${api_key}` } })
        .then(function (response) {
        response.json().then((data) => {
            console.log('the businessesDetail is ', data);
            res.json(data);
        });
    });
});
app.listen(port, () => {
    console.log(`API listening on the port: ${port}`);
});

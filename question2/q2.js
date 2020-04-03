const request = require('request');
const express = require('express');

const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
    request('http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees', (err, response, data) =>{
        let result = JSON.parse(data);

        res.render('employees', {
            employees:result
        });
    })
});

app.listen(port, () =>{
    console.log("listening on port "+port);
})
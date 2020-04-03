
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const file = "./employees.json";

const jsonFail = JSON.parse('{"id": "none", "name": "none", "projectId": "none"}')

app.get('/employee/:id', (req, res) => {
    fs.readFile(file, (err, data) =>{
        if(err){
            console.log("there was an error fetching employees");
        }else{
            let array = JSON.parse(data).employees;
            array.forEach(element => {
                if(element.id == parseInt(req.params.id)){
                    res.send(element);
                }
            });
            res.send(jsonFail);
        }
    })
})

/*
app.listen(port, () =>{
    console.log("listning on port "+port)
})
*/

module.exports = app;
const request = require('request');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const pfile = "./projects.json";
const efile = "./employees.json";

var projects = require('./projects');
var employees = require('./employees');

app.use('/', employees);
app.use('/', projects);

app.get('/getemployeedetails/:id', (req, res) =>{
    let eid = req.params.id;
    let requeststring1 = 'http://localhost:3000/employee/'+eid;
    request(requeststring1, (err, response, data) =>{
        if(err){
            res.render('employeedetails', {
                employeeName:"error finding employee data",
                employeeId:"error finding employee data",
                projectName:"error finding project data"
            });
        }else{
            let jsonData = JSON.parse(data);
            let empId = jsonData.id;
            let empName = jsonData.name;
            let pid = jsonData.projectId;
            let requeststring2 = 'http://localhost:3000/project/'+pid;

            request(requeststring2, (err, response, data) =>{
                if(err){
                    res.render('employeedetails', {
                        employeeName:empName,
                        employeeId:empId,
                        projectName:"error finding project data"
                    });
                }else{
                    let projName = JSON.parse(data).name;

                    res.render('employeedetails', {
                        employeeName:empName,
                        employeeId:empId,
                        projectName:projName
                    });
                }
            });
        }
    });
});

app.listen(port, () =>{
    console.log("listning on port "+port)
})
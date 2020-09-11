var report= require('../service/report.js');
var bill= require('../service/generatebill.js');
var product= require('../service/product.js');
var Promise=require('promise');
const { request } = require('express');
var loginservice = require('../service/loginservice.js');
var userservice=require('../service/usermanagementservice.js')

var appRouter = function(app) {
app.get("/", function(req,res) {
    product.data.getProductList().then(function(response) {
        res.send(response);
    })
});
app.get("/product", function(req,res) {
    product.data.getProductPrice(req).then(function(response) {
        res.send(response);
    })
});
app.get("/report",function(req,res){
    report.data.getReport(req).then(function(response){
        res.send(response);
    })
});

app.post("/product", function(req,res) {
    product.data.saveProductDetails(req).then(function(response) {
        res.send(response);
    })
});


app.post("/print", function(req,res) {
    bill.data.printDetails(req).then(function(response) {
        res.send(response);
    })
});

app.put("/product", function(req,res) {
    product.data.editProductDetails(req).then(function(response) {
        res.send(response);
    })
});
app.delete("/product", function(req,res) {
    product.data.deleteProductDetails(req).then(function(response) {
        res.send(response);
    })
});

app.post("/login", function(req,res) {
    loginservice.loginCredentials(req,res)
});


app.get("/getUserDetails", function(req,res) {
    userservice.getUserDetails(req,res).then(function(response){
        res.send(response);
    })
});

app.get("/getAllUserDetails", function(req,res) {
    userservice.getAllUserDetails(req,res).then(function(response){
        res.send(response);
    })
});

app.post("/addUserDetails",function(req,res){
    userservice.addUserDetails(req,res);
})

app.put("/updateUserDetails",function(req,res){
    if(req.body.userId===undefined){
        res.status(400);
        var result={
            "status" : "failure",
            "message" : "Params Missing"
        }
        res.json(result);
    }else{
        userservice.updateUserDetails(req,res);
    }
})

app.delete("/deleteUserDetails",function(req,res){
    if(req.body.userId===undefined){
        res.status(400);
        var result={
            "status" : "failure",
            "message" : "Params Missing"
        }
        res.json(result);
    }else{
        userservice.deleteUserDetails(req,res);
    }
})

}

module.exports = appRouter;
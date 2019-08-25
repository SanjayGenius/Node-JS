var report= require('../service/report.js');
var bill= require('../service/generatebill.js');
var product= require('../service/product.js');
var Promise=require('promise');

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
}

module.exports = appRouter;
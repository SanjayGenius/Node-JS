var service      = require('../service/bike.js');
var report= require('../service/report.js');
var bill= require('../service/generatebill.js');
var product= require('../service/product.js');
var Promise=require('promise');

var appRouter = function(app) {
app.get("/", function(req,res) {
   // res.send(product.data.getProductList());
    //  product.data.getProductList().then((data) => {
    //     res.send(JSON.stringify(data));
    //  }).catch(function(){
    //     console.log("Promise Rejected");
    //  });
    product.data.getProductList().then(function(response) {
        res.send(response);
    })
});

// app.get("/account", function(req, res) {
//          res.send(service.data.getAccountDetails(req));
// });

// app.post("/account", function(req, res) {
//     if(!req.body.username || !req.body.password || !req.body.twitter) {
//          res.send({"status": "error", "message": "missing a parameter"});
//     } else {
//          res.send(req.body);
//     }
// });

//     app.get('/customer', function (req, res) {
//         service.data.getCustomerDetails().then(data => {
//             res.send(JSON.stringify(data));
//         }).catch(function () {
//             console.log("Promise Rejected");
//         });
//     });
}

module.exports = appRouter;
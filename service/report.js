var dao = require('../dao/reportdao.js');
var methods={
    getReport : function(req){
        var fromDate=req.query.fromDate;
        var toDate=req.query.toDate;
        var customerName='';
        var customerArray=[];
        
        return dao.getBillReport(fromDate,toDate).then(function(response){
            for(var data in response){
                var resultArray=[];
               var customerObj='';
              // module.exports.getDetailedReport(response[data].customer_id);
            dao.getDetailedReport(response[data].customer_id).then(function(result){
                  for(var resultData in result){
                    var obj={
                        "quantity" : result[resultData].quantity,
                        "productName":result[resultData].product_name,
                        "price" : result[resultData].price
                    }
                    resultArray.push(obj);
                  }
                  console.log(resultArray)
                })
                customerObj={
                    "customerName": response[data].customer_name,
                    "date" : response[data].visited_date,
                    "detailedReport" : resultArray
                }
                customerArray.push(customerObj);
            }
            console.log(customerArray)
        })
        
    }
}
exports.data=methods;
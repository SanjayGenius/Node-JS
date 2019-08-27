var dao = require('../dao/reportdao.js');
var methods={
    getReport : function(req){
        var fromDate=req.query.fromDate;
        var toDate=req.query.toDate;
        var customerArray=[];
        var finalData='';
        return dao.getBillReport(fromDate,toDate).then(async function(response){
            console.log(response.length)
            if(response.length>0){
            for(var data in response){
               customerArray.push(await methods.getDetailedReport(response[data].customer_id,response[data].customer_name,response[data].visited_date,response[data].bill_amount)) 
            }
            finalData={
                "status" : "success",
                "data" : customerArray,
            }
        }else{
            finalData={
                "status" : "failure",
                "data" : "No reports available for the selected date range",
            }
        }
            return finalData;
        })
        
    },
    getDetailedReport : function(cusId, customer_name, visited_date,billAmount){
        let resultArray = [];
        return dao.getDetailedReport(cusId).then(function(result){
            for(var resultData in result){
              var obj={
                  "quantity" : result[resultData].quantity,
                  "productName":result[resultData].product_name,
                  "price" : result[resultData].price
              }
              resultArray.push(obj);
            }
            var year=visited_date.getFullYear();
            var month= visited_date.getMonth()+1;
            var day=visited_date.getDate();
            var formatMonth=month>9?month:"0"+month;
            var formatDay=day>9?day:"0"+day;
            var formattedDate=year+"-"+formatMonth+"-"+formatDay;
            customerObj={
                "totalBillAmount" : billAmount,
                "customerName": customer_name,
                "date" : formattedDate,
                "detailedReport" : resultArray
          }
          return customerObj;
          })   
    }
}
exports.data=methods;
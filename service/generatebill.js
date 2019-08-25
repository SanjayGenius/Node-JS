var dao = require('../dao/billgeneratedao.js');
var methods= {
    printDetails:function(req){
        var customerName=req.body.customerName;
        var totalBillAmount=req.body.totalBillAmount;
        var productDetails=req.body.purchasedProductList;
        var date= new Date();
        var customerId=0;
        var addResult=true;
        var finalResult='';
        return dao.addCustomerReport(customerName,totalBillAmount,date).then(function(response){
            if(response.insertId>0)
                customerId=response.insertId;
            else
                addResult=false;
            for(var data in productDetails){
                    dao.addDetailedReport(productDetails[data],customerId);
                    if(response.insertId==0)
                    addResult=false;
            }
            if(addResult){
                finalResult={
                    "status" : "success",
                    "data" : "Printed Successfully"
                }
            }else{
                finalResult={
                    "status" : "failure",
                    "data" : "Error while printing details"
                }
            }
            return JSON.stringify(finalResult);
        });
        
       
    }
}
exports.data=methods;
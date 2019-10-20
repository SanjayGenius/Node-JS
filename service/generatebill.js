var dao = require('../dao/billgeneratedao.js');
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const electron = typeof process !== 'undefined' && process.versions && !!process.versions.electron;
var methods= {
    printDetails:function(req){
        var customerName=req.body.customerName;
        var totalBillAmount=req.body.totalBillAmount;
        var productDetails=req.body.purchasedProductList;
        var date= new Date();
        var customerId=0;
        var addResult=true;
        var finalResult='';
       // return dao.addCustomerReport(customerName,totalBillAmount,date).then(async function(response){
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
               // addResult= await methods.printBill(productDetails,totalBillAmount,customerName,date)
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
        
       
    },
    printBill : async function(productDetails,totalBillAmount,customerName,date){
        let printer = new ThermalPrinter({
            type: PrinterTypes.EPSON,                                  // Printer type: 'star' or 'epson'
            //interface: 'USB001',
            interface: '192.168.0.49',                                            // Printer interface',     
            driver:'Epson ESC/P 9pin V4 Class Driver', 
          // driver: require(electron ? 'electron-printer' : 'Epson ESC/P 9pin V4 Class Driver'),
            characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
            removeSpecialCharacters: false,                           // Removes special characters - default: false
            lineCharacter: "=",                                       // Set character for lines - default: "-"
            options:{                                                 // Additional options
              timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
            }
          });
            let isConnected =await  printer.isPrinterConnected();
            console.log(isConnected);
            printer.setTextNormal();                                    // Set text to normal
            printer.setTextDoubleHeight();                              // Set text to double height
            printer.setTextDoubleWidth();                               // Set text to double width
            printer.setTextQuadArea();                                  // Set text to quad area
            printer.setTextSize(7,7);    
            //printer.openCashDrawer(); 
            //printer.alignCenter();
            printer.println("Hello world"); 
                //printer.cut();
            printer.println("Hello World"); 
            printer.println("Hello World"); 
            printer.println("Hello World"); 
            printer.println("Hello World"); 
            try {
                let execute =await printer.execute();
                console.log(printer)
                console.log("!!!!!!!!!"+execute+"@@@@@@@@@@@@");
               
              } catch (error) {
                console.log("Print failed:", error);
              }

    }
}
exports.data=methods;
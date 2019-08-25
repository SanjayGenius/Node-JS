var db = require('../config/dbconnect.js');

exports.addCustomerReport =function (customerName,totalBillAmount,date){
	var fields=[
		[customerName,totalBillAmount,date]
	];
	var query="INSERT INTO customer_report (customer_name, bill_amount, visited_date) VALUES ?"
	return new Promise((resolve, reject) => {
		db.query(query,[fields], function (error, result) {
			if (error) 
				reject(error);	
			resolve(result);
		});
	});	
}
exports.addDetailedReport = function(productDetails,customerId){
    var fields=[
		[customerId,productDetails.productName,productDetails.quantity,productDetails.productPrice]
	];
	var query="INSERT INTO detailed_report (customer_id, product_name, quantity,price) VALUES ?"
	return new Promise((resolve, reject) => {
		db.query(query,[fields], function (error, result) {
			if (error) 
				reject(error);	
			resolve(result);
		});
	});	
}
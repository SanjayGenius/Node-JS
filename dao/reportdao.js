var db = require('../config/dbconnect.js');

exports.getBillReport = function(fromDate,toDate){
	var fields=[fromDate,toDate];
	var query="SELECT * FROM `customer_report` WHERE visited_date>='"+fromDate+"' AND visited_date<='"+toDate+"'"
	return new Promise((resolve,reject) => {
		db.query(query,function (error, result) {
			if (error) 
				reject(error);	
			resolve(result);
		});
	})
}

exports.getDetailedReport=function(customerId){
	var query="SELECT * FROM `detailed_report` WHERE customer_id="+customerId
	return new Promise((resolve,reject) => {
		db.query(query,function(error,result){
			if(error)
				reject(error)
			resolve(result);
		});
	})
}

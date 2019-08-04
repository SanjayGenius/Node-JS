var db = require('../config/dbconnect.js');

exports.getCustomerDetails = function(){
	return new Promise((resolve, reject) => {
		db.query('select * from bike_details', function (error, results, fields) {
			if (error) 
				reject(error);	
			resolve(results);
		});
	});	
}

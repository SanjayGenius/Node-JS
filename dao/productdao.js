var db = require('../config/dbconnect.js');

exports.getProductDetails = function(){
	return new Promise((resolve, reject) => {
		db.query('select * from product_info', function (error, results, fields) {
			if (error) 
				reject(error);	
			resolve(results);
		});
	});	
}

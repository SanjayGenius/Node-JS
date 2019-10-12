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
exports.addProductDetails =function (productDetails){
	var fields=[
		[productDetails.productName,productDetails.productPrice,'yes']
	];
	var query="INSERT INTO product_info (product_name, product_price, availability) VALUES ?"
	return new Promise((resolve, reject) => {
		db.query(query,[fields], function (error, result) {
			if (error) 
				reject(error);	
			resolve(result);
		});
	});	
}
exports.checkProductAvailable =function (productDetails){
	var query="select COUNT(*) as count from product_info where product_name='"+productDetails.productName+"'";
	console.log(query+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	return new Promise((resolve, reject) => {
		db.query(query, function (error, results, fields) {
			if (error) 
				reject(error);	
			resolve(results);
		});
	});	

}
exports.editProductDetails =function (productDetails){
	var query="UPDATE product_info set product_name='"+productDetails.productName+"',product_price='"+productDetails.productPrice+"' where product_id="+productDetails.productId
	console.log(query);
	return new Promise((resolve, reject) => {
		db.query(query, function (error, result) {
			if (error) 
				reject(error);	
			resolve(result);
		});
	});	
}
exports.deleteProductDetails =function (productDetails){
	var query="DELETE from product_info where product_id="+productDetails.productId
	return new Promise((resolve, reject) => {
		db.query(query, function (error, result) {
			if (error) 
				reject(error);	
			resolve(result);
		});
	});	
}
exports.getProductPrice= function(productId){
	var query="SELECT product_price,product_name from product_info where product_id="+productId

	return new Promise((resolve,reject) => {
		db.query(query, function (error, result) {
			if (error) 
				reject(error);	
			resolve(result);
		});
	});
}

var dao = require('../dao/productdao.js');
var Promise=require('promise');
var methods= {
    getProductList :function(req){
        return dao.getProductDetails();
    },
    saveProductDetails :function(req){
        var productDetails = req.body;
        dao.addProductDetails(productDetails).then(function(response){
            if(response.insertId!=0){
                var finalResult={
                    "data":"Product Details added successfully",
                    "status" : "SUCCESS"
                };
                return JSON.stringify(finalResult);
            }
        });
    },
    editProductDetails:function(req){
        var productDetails = req.body;
        dao.editProductDetails(productDetails).then(function(response){
            if(response.affectedRows!=0){
                var finalResult={
                    "data":"Product Details updated successfully",
                    "status" : "SUCCESS"
                };
                return JSON.stringify(finalResult);
            }
        });
    },
    deleteProductDetails:function(req){
        var productDetails = req.body;
        dao.deleteProductDetails(productDetails).then(function(response){
            if(response.affectedRows!=0){
                var finalResult={
                    "data":"Product Details deleted successfully",
                    "status" : "SUCCESS"
                };
                return JSON.stringify(finalResult);
            }
        });
    }
    
    
}
exports.data = methods;
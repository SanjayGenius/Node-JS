var dao = require('../dao/productdao.js');
var methods= {
    getProductList :function(req){
        return dao.getProductDetails();
    },
    getProductPrice :function(req){
        var productId=req.query.productId;
        var quantity=req.query.quantity;
        return dao.getProductPrice(productId).then(function(response){
            var price=quantity * response[0].product_price;
            var name= response[0].product_name;
                 var finalResult={
                     "productPrice":price,
                     "productName":name,
                     "quantity":quantity,
                     "productId":productId,
                     "status" : "success"
                 };
                 return JSON.stringify(finalResult);
         });
    },
    saveProductDetails :function(req){
        var productDetails = req.body;
       return dao.addProductDetails(productDetails).then(function(response){
            if(response.insertId!=0){
                var finalResult={
                    "data":"Product Details added successfully",
                    "status" : "success"
                };
                return JSON.stringify(finalResult);
            }
        });
    },
    editProductDetails:function(req){
        var productDetails = req.body;
        return dao.editProductDetails(productDetails).then(function(response){
            if(response.affectedRows!=0){
                var finalResult={
                    "data":"Product Details updated successfully",
                    "status" : "success"
                };
                return JSON.stringify(finalResult);
            }
        });
    },
    deleteProductDetails:function(req){
        var productDetails = req.body;
        return dao.deleteProductDetails(productDetails).then(function(response){
            if(response.affectedRows!=0){
                var finalResult={
                    "data":"Product Details deleted successfully",
                    "status" : "success"
                };
                return JSON.stringify(finalResult);
            }
        });
    }
    
    
}
exports.data = methods;
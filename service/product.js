var dao = require('../dao/productdao.js');
var Promise=require('promise');
var methods= {
    getProductList :function(req){
        var result=[];
        var productList= dao.getProductDetails().then(productList => {
            console.log(productList)
        return productList;
        }).catch(function(){
        console.log("Error occured");
     });
    }
}
exports.data = methods;
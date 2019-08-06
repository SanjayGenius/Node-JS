var dao = require('../dao/productdao.js');
var Promise=require('promise');
var methods= {
    getProductList :function(req){
        var result=[];
        return dao.getProductDetails();
    }
}
exports.data = methods;
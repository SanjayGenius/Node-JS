var dao = require('../dao/bikedao.js');
var methods = {

    getAccountDetails:function(req){

    },


    testing:function(req){
        return "Hello World"
    },

    getCustomerDetails:function(){
         return dao.getCustomerDetails();
    }

};
exports.data = methods;
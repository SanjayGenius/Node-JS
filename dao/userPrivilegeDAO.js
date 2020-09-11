var connection = require('../config/dbconnect.js');
const log4js = require('log4js');
const infoLogger = log4js.getLogger('userManagement');
const errorLogger = log4js.getLogger('error');
var AWS = require("aws-sdk");
AWS.config.update(global.DynamoDBAccessToken);
var docClient = new AWS.DynamoDB.DocumentClient();
function userPrivilegesDao(){

}
 
userPrivilegesDao.assignPrivileges = function (data, callback) {
  var table = global.UserPrivilegesTbl;
  if(data!=null){
    var params = {
        TableName: table,
        Item: data
        }
      docClient.put(params, function (err, privilege) {
        if (err) {
          infoLogger.error('unable to add user details'+JSON.stringify(err, null, 2));
            
          errorLogger.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
            callback(err, null)
        } else {
            infoLogger.info("User privileges details added successfully:" + JSON.stringify(data));
            callback(null, privilege)
        }
    });
  }
    
}

userPrivilegesDao.deletePrivileges = function (userId, callback) {
 
    var table = global.UserPrivilegesTbl;
    var params = {
      TableName: table,
      Key: { 
        "userId": userId
      }
   
  };
    
      docClient.delete(params, function (err, user) {
        if (err) {
          infoLogger.error('unable to delete user privileges'+JSON.stringify(err, null, 2));
            
          errorLogger.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
            callback(err, null)
        } else {
            infoLogger.info("User details added successfully:" + JSON.stringify(user));
            callback(null, user)
        }
    });
  
}

userPrivilegesDao.disablePrivilege = function (data, callback) {
	
  var table = global.UserPrivilegesTbl;
  if (data != null) {
      var params = {
      TableName: table,
    Key:{
        "userId": data.userId,
    },
    UpdateExpression: "set modifiedDate = :modifiedData, endDate = :modifiedData",
    ExpressionAttributeValues:{
      ":modifiedData": data.modifiedDate
    },
  }
  docClient.update(params, function (err, user) {
     if (err) {
      infoLogger.error('unable to add user details'+JSON.stringify(err, null, 2));
            
          errorLogger.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))  
              callback(err, null)
          } else {
            infoLogger.info("User details added successfully:" + JSON.stringify(user));
              callback(null, user)
          }
  });
  }
}

module.exports = userPrivilegesDao;
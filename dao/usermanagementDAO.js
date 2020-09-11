var connection = require('../config/dbconnect.js');
const { Op } = require("sequelize");
const log4js = require('log4js');
const infoLogger = log4js.getLogger('userManagement');
const errorLogger = log4js.getLogger('error');
var AWS = require("aws-sdk");
AWS.config.update(global.DynamoDBAccessToken);
var docClient = new AWS.DynamoDB.DocumentClient();
function userManagementDao(){

}


userManagementDao.fetchUser = function (loginId, callback) {
  var table = global.UserTbl;
  var index = global.loginIndex;
  var params = {
      TableName: table,
      IndexName : index,
      KeyConditionExpression: "#login = :loginId",
      ExpressionAttributeNames: {
          "#login": "loginId"
      },
      ExpressionAttributeValues: {
          ":loginId": loginId
      }
  };

  docClient.query(params, function (err, data) {
      if (err) {
        infoLogger.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        errorLogger.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
          callback(err, null)
      } else {
       console.log("1111Scan succeeded." + JSON.stringify(data));
          callback(null, data);
      }
  });
}

userManagementDao.addUser = function (data, callback) {
  var table = global.UserTbl;
  if(data!=null){
    var params = {
        TableName: table,
        Item: data
        }
      docClient.put(params, function (err, user) {
        if (err) {
          infoLogger.error('unable to add user details'+JSON.stringify(err, null, 2));
            
          errorLogger.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
            callback(err, null)
        } else {
            infoLogger.info("User details added successfully:" + JSON.stringify(data));
            callback(null, user)
        }
    });
  }
    
}

userManagementDao.checkExistingUser = function (data, callback) {
  var table = global.UserTbl;
  var index = global.loginIndex;
  var params = {
      TableName: table,
      IndexName : index,
      KeyConditionExpression: "#login = :loginId and userId  <> :userIdValue",
      ExpressionAttributeNames: {
          "#login": "loginId",
          "#userId": "userIdValue"
      },
      ExpressionAttributeValues: {
          ":loginId": data.loginId,
          ":userIdValue": data.userId
      }
  };

  docClient.query(params, function (err, user) {
      if (err) {
        infoLogger.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        errorLogger.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
          callback(err, null)
      } else {
       console.log("1111Scan succeeded." + JSON.stringify(user));
          callback(null, data);
      }
  });
}

userManagementDao.updateUser = function (data, callback) {
    if (data != null) {
        var params = {
            TableName: global.UserTbl,
            Item: data
        }
        docClient.put(params, function (err, user) {
          if (err) {
            infoLogger.error('unable to add user details'+JSON.stringify(err, null, 2));
              
            errorLogger.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
              callback(err, null)
          } else {
              infoLogger.info("User details added successfully:" + JSON.stringify(data));
              callback(null, user)
          }
      });
    }
}

userManagementDao.deleteUser = function (data, callback) {
	
    var table = global.UserTbl;
    if (data != null) {
        var params = {
		    TableName: table,
			Key:{
          "userId": data.userId,
          "loginId" : data.loginId
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

module.exports = userManagementDao;
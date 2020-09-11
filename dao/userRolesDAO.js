var connection = require('../config/dbconnect.js');
const log4js = require('log4js');
const infoLogger = log4js.getLogger('userManagement');
const errorLogger = log4js.getLogger('error');
var AWS = require("aws-sdk");
AWS.config.update(global.DynamoDBAccessToken);
var docClient = new AWS.DynamoDB.DocumentClient();
function userRolesDao(){

}


userRolesDao.fetchPrivilegesBasedOnRoleId = function (roleId, callback) {
  var table = global.UserRolesTbl;
  var params = {
      TableName: table,
      KeyConditionExpression: "#role = :roleId",
      ExpressionAttributeNames: {
          "#role": "roleId"
      },
      ExpressionAttributeValues: {
          ":roleId": roleId
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

module.exports=userRolesDao;



 
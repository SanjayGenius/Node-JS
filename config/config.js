//Server type configuration
//(For DynamoDB - Dev or Beta or Prod)
var dbType = "";
//(For S3 - dev or beta or prod)
// var s3Type = "-";

//(For Development and Beta - us-east-2)
//(For Production - us-east-1)
var regionType = "Enter region";

//Access token for DynamoDB Access
global.DynamoDBAccessToken = {
    accessKeyId: 'aaa',
    secretAccessKey: 'bbb',
    region: "ap-south-1",
    endpoint: "http://localhost:8000/" 
}

//DynamoDB Tables
global.UserTbl = "UserDetails"+dbType
global.loginIndex = "LoginDetailsIndex"
global.UserRolesTbl = "UserRoles"+dbType
global.FeaturesTbl = "Features"+dbType
global.UserPrivilegesTbl = "UserPrivileges"+dbType


global.Url = "https://localhost:8090";


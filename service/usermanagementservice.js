var usermanagementDAO=require("../dao/usermanagementDAO");
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
var userPrivilegeDAO = require("../dao/userPrivilegeDAO");
var userRolesDAO = require("../dao/userRolesDAO");
var Sequelize = require('sequelize');
const sequelizeData=new Sequelize('bikeroverz','root','root',{
     host: 'localhost',
     dialect : 'mariadb'
})
const log4js = require('log4js');
const infoLogger = log4js.getLogger('userManagement');
const errorLogger = log4js.getLogger('error');
var uniqid = require('uniqid');
var moment = require('moment');
module.exports =  {
    getUserDetails:getUserDetails,
    getAllUserDetails:getAllUserDetails,
    addUserDetails : addUserDetails,
    updateUserDetails : updateUserDetails,
    deleteUserDetails : deleteUserDetails,
}

function getUserDetails(req,res){
    var userType = "Bookie";
    if(req.query.role_id==2){
        userType = "Bookie";
    }else if(req.query.role_id==3){
        userType = "Dealer";
    }else if(req.query.role_id==4){
        userType = "Investor";
    }else if(req.query.role_id==5){
        userType = "Customer";
    }
    var finalResult={
        "status" : "failure",
        "message" : "No details available"
    }
    if(req.query.userId!=0){
        infoLogger.info("Fetching user details: ",req.query.userId);
        return usermanagementDAO.getUserDetails(req.query.userId).then(function(response){
            if(response!=null){
                infoLogger.info("User details fetched successfully: ",req.query.userId);
                finalResult={
                    "status" : "success",
                    "message" : userType+" details fetched successfully",
                    "data" : response
                }
                res.send(finalResult);
            }else{
                infoLogger.info("No details available for: ",req.query.userId);
                res.send(finalResult);
            }
        })
    }else{
        infoLogger.error("Error occurred while fetching user details- invalid user id ");
        errorLogger.error("Error occurred while fetching user details- invalid user id ");
        res.send(finalResult);
    }
}

function getAllUserDetails(req,res){
    infoLogger.info("Fetching all user details ");
    return usermanagementDAO.getAllUserDetails(req).then(function(response){
        var finalResult={
            "status" : "success",
            "message" : "No details available"
        }
        if(response!=null){
            infoLogger.info("All user details fetched successfully");
            var finalResult={
                "status" : "success",
                "data":response,
                "message" : "User details fetched successfully",
            }
            res.send(finalResult);
        }else{
            infoLogger.info("No user details available ");
            finalResult={
            "status" : "failure",
            "message" : "Error occurred while fetching user details"
        }
            res.send(finalResult);
        }
    })
}


function getHashPassword(password){
    return new Promise(function(resolve, reject) {
        bcrypt.hash(password,bcrypt.genSaltSync(12),function(err,response){
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        })
    })
}

function addUserDetails(req,res){
    var finalResult;
    var userType = "Bookie";
    if(req.body.roleId==2){
        userType = "Bookie";
    }else if(req.body.roleId==3){
        userType = "Dealer";
    }else if(req.body.roleId==4){
        userType = "Investor";
    }else if(req.body.roleId==5){
        userType = "Customer";
    }
    finalResult={
        "status" : "failure",
        "message" : "Error occured while creating "+userType
    }
    if(req.body.loginId!=''&&req.body.loginId!=null){
        infoLogger.info("Checking email id is already exists or not: ",req.body.login_id);
        usermanagementDAO.fetchUser(req.body.loginId, function (err, users) {
            if (err) {
                finalResult.status = "failure";
                finalResult.message = "Database Connection Failed";
                infoLogger.info("Database Connection Failed"); 
                res.send(finalResult);
            }else{
                if (users!=null && users.Count == 0) {   
                    var userData = req.body;
                    userData.activeStatus = 1;
                    var createdTime = moment().valueOf();
                    var userId =  createdTime+"_"+uniqid.process();
                    userData.userId = userId;
                    usermanagementDAO.addUser(userData,function (err, users) {
                        if (err) {
                           finalResult.status = "failure";
                           finalResult.message = "Database Connection Failed";
                             infoLogger.info("Database Connection Failed"); 
                             res.send(finalResult);
                        }else{
                            var privilegeData = {
                                "userId" : userId
                            }
                            userRolesDAO.fetchPrivilegesBasedOnRoleId(req.body.roleId, function (err, roles) {
                                if (err) {
                                    finalResult.status = "failure";
                                    finalResult.message = "Database Connection Failed";
                                    infoLogger.info("Database Connection Failed"); 
                                    res.send(finalResult);
                                }else{
                                    if(roles!=null && roles.Count>0){
                                        var featureIdsArray = roles.Items[0].featureIds.split(",");
                                        var featureIds = [];
                                        for(var i=0; i<featureIdsArray.length; i++) { featureIds[i] = parseInt(featureIdsArray[i], 10); }
                                        privilegeData.featureIds="";
                                        for(var i=0; i<featureIds.length; i++) {
                                            if(privilegeData.featureIds!=undefined && privilegeData.featureIds!="")
                                            privilegeData.featureIds = featureIds[i]+","+privilegeData.featureIds;
                                            else
                                            privilegeData.featureIds = featureIds[i];
                                        } 
                                        privilegeData.createdDate = moment().valueOf();
                                        infoLogger.info("Assigning user privileges for: ",userId);
                                        var privilegeId =  moment().valueOf()+"_"+uniqid.process();
                                        privilegeData.privilegeId = privilegeId;
                                        userPrivilegeDAO.assignPrivileges(privilegeData, function (err, privileges) {
                                            if (err) {
                                                finalResult.status = "failure";
                                                finalResult.message = "Database Connection Failed";
                                                infoLogger.info("Database Connection Failed"); 
                                                res.send(finalResult);
                                            }else{
                                                finalResult={
                                                    "status" : "success",
                                                    "message" : userType +" created successfully",
                                                }
                                                res.send(finalResult);
                                            }
                                        })
                                    }else{
                                        finalResult={
                                            "status" : "failure",
                                            "message" : "Error occured while creating "+userType
                                        }
                                        res.send(finalResult);
                                    }
                                }
                            })
                         }
                    })
                   }else{
                     finalResult.status = "failure";
                     finalResult.message = "Email Id already exists"; 
                     infoLogger.info("Email Id already exists");
                     res.send(finalResult);
                   }
            }
        })
    }else{
        infoLogger.error( "Error occured while creating "+userType+"- invalid loginId");
        errorLogger.error( "Error occured while creating "+userType+"- invalid loginId");
        finalResult={
            "status" : "failure",
            "message" : "Error occured while creating "+userType
        }
        res.send(finalResult);
    }
}


function updateUserDetails(req,res){
    var finalResult;
    var userType = "Bookie";
    if(req.body.roleId==2){
        userType = "Bookie";
    }else if(req.body.roleId==3){
        userType = "Dealer";
    }else if(req.body.roleId==4){
        userType = "Investor";
    }else if(req.body.roleId==5){
        userType = "Customer";
    }
    finalResult={
        "status" : "failure",
        "message" : "Error occured while updating "+userType
    }
    var updateData = req.body;
    if(req.body.loginId!=''&& req.body.loginId!=null && req.body.userId!=''&& req.body.userId!=null){
        infoLogger.info("Checking email id is already exists or not: ",req.body.login_id);
        var checkData = {
            "userId" : req.body.userId,
            "loginId" : req.body.loginId
        }
        usermanagementDAO.checkExistingUser(checkData, function (err, users) {
            if (err) {
                finalResult.status = "failure";
                finalResult.message = "Database Connection Failed";
                infoLogger.info("Database Connection Failed"); 
                res.send(finalResult);
            }else{
                console.log("users ......... ",users);
                var currentTime = moment().valueOf();
                updateData.modifiedDate = currentTime;
                updateData.activeStatus = 1;
                // usermanagementDAO.updateUser(updateData, function (err, users) {
                //     if (err) {
                //         finalResult.status = "failure";
                //         finalResult.message = "Database Connection Failed";
                //         infoLogger.info("Database Connection Failed"); 
                //         res.send(finalResult);
                //     }else{
                //         finalResult={
                //             "status" : "success",
                //             "message" : userType +" updated successfully",
                           
                //         }
                //         userPrivilegeDAO.deletePrivileges(req.body.userId, function (err, users) {
                //             if (err) {
                //                 finalResult.status = "failure";
                //                 finalResult.message = "Database Connection Failed";
                //                 infoLogger.info("Database Connection Failed"); 
                //                 res.send(finalResult);
                //             }else{
                //                 var userId = req.body.userId;
                //                 var privilegeData = {
                //                     "userId" : userId
                //                 }
                //                 userRolesDAO.fetchPrivilegesBasedOnRoleId(req.body.roleId, function (err, roles) {
                //                     if (err) {
                //                         finalResult.status = "failure";
                //                         finalResult.message = "Database Connection Failed";
                //                         infoLogger.info("Database Connection Failed"); 
                //                         res.send(finalResult);
                //                     }else{
                //                         if(roles!=null && roles.Count>0){
                //                             var featureIdsArray = roles.Items[0].featureIds.split(",");
                //                             var featureIds = [];
                //                             for(var i=0; i<featureIdsArray.length; i++) { featureIds[i] = parseInt(featureIdsArray[i], 10); }
                //                             privilegeData.featureIds="";
                //                             for(var i=0; i<featureIds.length; i++) {
                //                                 if(privilegeData.featureIds!=undefined && privilegeData.featureIds!="")
                //                                 privilegeData.featureIds = featureIds[i]+","+privilegeData.featureIds;
                //                                 else
                //                                 privilegeData.featureIds = featureIds[i];
                //                             } 
                //                             privilegeData.createdDate = moment().valueOf();
                //                             infoLogger.info("Assigning user privileges for: ",userId);
                //                             var privilegeId =  moment().valueOf()+"_"+uniqid.process();
                //                             privilegeData.privilegeId = privilegeId;
                //                             userPrivilegeDAO.assignPrivileges(privilegeData, function (err, privileges) {
                //                                 if (err) {
                //                                     finalResult.status = "failure";
                //                                     finalResult.message = "Database Connection Failed";
                //                                     infoLogger.info("Database Connection Failed"); 
                //                                     res.send(finalResult);
                //                                 }else{
                //                                     finalResult={
                //                                         "status" : "success",
                //                                         "message" : userType +" updated successfully",
                //                                     }
                //                                     res.send(finalResult);
                //                                 }
                //                             })
                //                         }else{
                //                             finalResult={
                //                                 "status" : "failure",
                //                                 "message" : "Error occured while creating "+userType
                //                             }
                //                             res.send(finalResult);
                //                         }
                //                     }
                //                 })
                //             }

                //         })
                //     }
                // })
               
            }
        })
    }else{
        infoLogger.error( "Error occured while updating "+userType+"- invalid loginId/userId");
        errorLogger.error( "Error occured while updating "+userType+"- invalid loginId/userId");
        finalResult={
            "status" : "failure",
            "message" : "Error occurred while updating "+userType
        }
        res.send(finalResult);
    }
   
}

function deleteUserDetails(req,res){
    var finalResult;
    var userType = "Bookie";
    if(req.body.roleId==2){
        userType = "Bookie";
    }else if(req.body.roleId==3){
        userType = "Dealer";
    }else if(req.body.roleId==4){
        userType = "Investor";
    }else if(req.body.roleId==5){
        userType = "Customer";
    }
        var modifiedDate = moment().valueOf();
        var deleteData = {
            "userId":req.body.userId,
            "loginId" : req.body.loginId,
            "modifiedDate" : modifiedDate,
            "endDate" : modifiedDate
        }
        infoLogger.info("Deleting user details: ",req.body.user_id);
        usermanagementDAO.deleteUser(deleteData, function (err, roles) {
            if (err) {
                finalResult.status = "failure";
                finalResult.message = "Database Connection Failed";
                infoLogger.info("Database Connection Failed"); 
                res.send(finalResult);
            }else{
                userPrivilegeDAO.disablePrivilege(deleteData, function (err, roles) {
                    if (err) {
                        finalResult.status = "failure";
                        finalResult.message = "Database Connection Failed";
                        infoLogger.info("Database Connection Failed"); 
                        res.send(finalResult);
                    }else{
                        finalResult={
                            "status" : "success",
                            "message" : userType+" deleted successfully"
                        }
                        res.send(finalResult);
                    }
                })
            }
        })
}

const request = require('./request');
const bcrypt = require('bcrypt');
const authDAO = require('../dao/authDAO.js');
const log4js = require('log4js');
const infoLogger = log4js.getLogger('userAuth');
const errorLogger = log4js.getLogger('error');

module.exports ={
  loginCredentials : loginCredentials
}

 function loginCredentials (req,res){
        var finalResult={
                    "status" : "success",
                    "message" : "Login successful",
                }
        if(req.body.loginId!=null && req.body.password!=null){
              authDAO.fetchUser(req.body.loginId, function (err, users) {
               console.log("users ............ ",users);
              if (err) {
                finalResult.status = "failure";
                finalResult.message = "Database Connection Failed";
                  infoLogger.info("Database Connection Failed"); 
                  res.send(finalResult);
              }
              //Check if user already registered
              else{
                  if (users!=null && users.Count > 0) {
                      if(bcrypt.compareSync(req.body.password,users.password)){
                        finalResult.data=users;
                          infoLogger.info("Login successfull");
                      }else{
                        finalResult.status = "failure";
                        finalResult.message = "Invalid password"; 
                        finalResult.data="";
                          infoLogger.info("Invalid password");
                      }
                      res.send(finalResult);
                  }else{
                    finalResult.status = "failure";
                    finalResult.message = "Invalid Credentials"; 
                      infoLogger.info("Invalid Credentials");
                      res.send(finalResult);
                  }
              }
          })
        }else{
          var finalResult={
              "status" : "failure",
              "message" : "Invalid parameters passed"
          }
          infoLogger.error("Invalid parameters passed");
          errorLogger.error("Invalid parameters passed");
          finalResult.status = "failure";
          finalResult.message = "Invalid parameters passed"; 
          res.send(finalResult);
        }
      }


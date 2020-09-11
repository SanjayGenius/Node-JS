const request = require('request');
const constanturl='http://localhost:8090/auth/';
module.exports =  {
    sendgetrequest: sendgetrequest,
    sendpostrequest:sendpostrequest,
    sendputrequest:sendputrequest
}
function sendgetrequest(requesturl){
    return new Promise(function(resolve, reject) {
        request(constanturl+requesturl,
        function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(response.body));
            }
        });
    })
}
function sendpostrequest(requesturl,data){
    return new Promise(function(resolve, reject) {
        request.post(constanturl+requesturl, {
            json:data
        }, function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response.body);
            }
        })
    })
}

function sendputrequest(requesturl,data){
    return new Promise(function(resolve, reject) {
        request.put(constanturl+requesturl, {
            json:data
        }, function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response.body);
            }
        })
    })
}
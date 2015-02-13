// taken from https://github.com/taskcluster/taskcluster-queue/blob/0dd2b45b860836a2ef6c651c5499c9abfb5670ad/utils/aws-sdk-promise.js
var aws = require('aws-sdk');
var Q = require('q');

// XXX: This is a terrible hack but it should not break anything in horrible
// ways.
aws.Request.prototype.q = function() {
  var deferred = Q.defer();

  this.on('complete', function(response) {
    if(response.error) deferred.reject(new Error(response.error));
    else deferred.resolve(response.data);
  });
  this.send();

  return deferred.promise;
};

module.exports = aws;

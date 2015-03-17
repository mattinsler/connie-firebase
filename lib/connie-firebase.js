var q = require('q');
var url = require('url');
var Firebase = require('firebase');
var firebaseBuilder = require('firebase-builder')(Firebase);

var ConnieFirebase = function(firebaseUrl) {
  var clientDeferred;
  var getClient = function() {
    if (!clientDeferred) {
      clientDeferred = q.defer();
      
      var client = firebaseBuilder(firebaseUrl, function(err) {
        if (err) { return clientDeferred.reject(err); }
        console.log('oijsoifjsdf');
        clientDeferred.resolve(client);
      });
    }
    
    return clientDeferred.promise;
  };
  
  return {
    read: function() {
      return getClient().then(function(client) {
        console.log('ihihjAS:DIhfIShadfIh');
        var d = q.defer();
        
        client.once('value', function(ref) {
          d.resolve(ref.val());
        }, function(err) {
          d.reject(err);
        });
        
        return d.promise;
      });
    },
    write: function(config) {
      return q.reject(new Error('firebase storage cannot write configurations'));
    }
  };
};

module.exports = function(connie) {
  connie.storage.firebase = ConnieFirebase;
};
module.exports.ConnieFirebase = ConnieFirebase;

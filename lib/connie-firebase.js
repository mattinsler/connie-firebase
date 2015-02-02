var q = require('q');
var url = require('url');
var Firebase = require('firebase');

var ConnieFirebase = function(firebaseUrl) {
  var clientDeferred;
  var getClient = function() {
    if (!clientDeferred) {
      clientDeferred = q.defer();
      
      var parsed = url.parse(firebaseUrl);
      var auth = parsed.auth;
      delete parsed.auth;
  
      var client = new Firebase(url.format(parsed));
      if (auth) {
        client.auth(auth.split(':')[1], function(err, authData) {
          if (err) { return clientDeferred.reject(err); }
          clientDeferred.resolve(client);
        });
      } else {
        clientDeferred.resolve(client);
      }
    }
    
    return clientDeferred.promise;
  };
  
  return {
    read: function() {
      return getClient().then(function(client) {
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

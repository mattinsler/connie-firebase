var q = require('q');
var url = require('url');
var Firebase = require('firebase');
var firebaseBuilder = require('firebase-builder')(Firebase);

var ConnieFirebase = function(firebaseUrl) {
  var getClient = function() {
    var d = q.defer();
    
    var client = firebaseBuilder(firebaseUrl, function(err) {
      if (err) { return d.reject(err); }
      d.resolve(client);
    });
    
    return d.promise;
  };
  
  return {
    read: function() {
      return getClient().then(function(client) {
        var d = q.defer();
        
        client.once('value', function(ref) {
          d.resolve(ref.val());
          client.goOffline();
        }, function(err) {
          d.reject(err);
          client.goOffline();
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

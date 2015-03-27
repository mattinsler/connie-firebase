var q = require('q');
var url = require('url');
var betturl = require('betturl');
var superagent = require('superagent');

var ConnieFirebase = function(firebaseUrl) {
  var parsed = betturl.parse(firebaseUrl);
  
  var opts = {
    hostname: parsed.host,
    port: parsed.port,
    protocol: parsed.protocol,
    pathname: parsed.path + '.json',
  };
  
  if (parsed.auth && parsed.auth.password) {
    opts.query = {
      auth: parsed.auth.password
    };
  }
  
  var valueUrl = url.format(opts);
  
  return {
    read: function() {
      return q.ninvoke(superagent.get(valueUrl), 'end').then(function(res) {
        return res.body;
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

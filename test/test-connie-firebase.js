var assert = require('assert');
var connie = require('connie');
require('../')(connie);

describe('connie-firebase', function() {
  it('Can create custom storage', function() {
    var configurer = connie('firebase', 'https://connie-test.firebaseio.com/staging');
    
    return configurer.read().then(function(config) {
      assert.deepEqual(config, {
        server: {
          port: 3000,
          domain: 'connie-test.com'
        }
      });
    });
  });
});

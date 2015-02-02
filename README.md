# connie-firebase

Firebase storage engine for use with [connie](https://github.com/mattinsler/connie).

## Installation

```bash
$ npm install --save connie-firebase
```

## Usage

```javascript
var connie = require('connie');
require('connie-firebase')(connie);

connie('firebase', 'https://connie-test.firebaseio.com/staging').then(function(config) {
  console.log(config);
});
```

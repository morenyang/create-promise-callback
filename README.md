# create-promise-callback

[![NPM version](https://img.shields.io/npm/v/next.svg)](https://www.npmjs.com/package/create-promise-callback)
[![Build Status](https://api.travis-ci.org/morenyang/create-promise-callback.svg?branch=master)](https://travis-ci.org/morenyang/create-promise-callback)

Make asynchronous methods support both Promise and callback.

## Install
```sh
$ yarn add create-promise callback
```

## Usage

```js
import createPromiseCallback from 'create-promise-callback';

function get(key, fn) {
  fn = fn || createPromiseCallback();

  RedisClient
    .get(key)
    .then((err, res) => {
      if(err) return fn(err);
      fn(null, res);
    })

  return fn.promise;
}

// callback
get('yourkey', (err, res) => {
  console.log(res);
})

// promise
get('yourkey')
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })

// also resolve with multi arguments
function multiArgsFunc(fn) {
  fn = fn || createPromiseCallback();

  yourFunc()
    .then((err, arg1, arg2) => {
      if(err) return fn(err);
      fn(null, arg1, arg2);
    })

  return fn.promise;
}

multiArgsFunc()
  .then((arg1, arg2) => {
    // ...
  })
```
## Use your preferred Promise library
set `global.Promise` to your preferred Promise libaray like [bluebird](http://bluebirdjs.com/). 

```js
global.Promise = require('bluebird')
```

## License
MIT
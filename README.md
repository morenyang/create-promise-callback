# create-promise-callback

Make asynchronous methods support both Promise and callback.

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

## License
MIT
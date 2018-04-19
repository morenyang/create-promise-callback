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
```

## License
MIT
const createPromiseCallback = () => {
  let cb;
  if (!global.Promise) {
    global.Promise = require('bluebird');
    console.warn(
      `Your Node rumtime does not support Promise, now using bluebrid. `
    );
    console.warn(
      `You can set "global.Promise" to your preferred Promise library. `
    );
  }

  const promise = new global.Promise((resolve, reject) => {
    cb = function() {
      const [err, ...args] = arguments;
      if (err) return reject(err);
      return resolve(args);
    };
  });
  cb.promise = promise;
  return cb;
};

exports = module.exports = createPromiseCallback;
exports.createPromiseCallback = createPromiseCallback;
exports.Promise = require('bluebird');
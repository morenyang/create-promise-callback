var createPromiseCallback = function createPromiseCallback() {
  var cb = void 0;
  if (!global.Promise) {
    global.Promise = require('bluebird');
    console.warn('Your Node rumtime does not support Promise, now using bluebrid. ');
    console.warn('You can set "global.Promise" to your preferred Promise library. ');
  }

  var promise = new global.Promise(function (resolve, reject) {
    cb = function cb() {
      var _arguments = Array.prototype.slice.call(arguments),
          err = _arguments[0],
          args = _arguments.slice(1);

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
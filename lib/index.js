function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createPromiseCallback = function createPromiseCallback() {
  var cb = void 0;
  if (!global.Promise) {
    global.Promise = require('bluebird');
  }

  var promise = new global.Promise(function (resolve, reject) {
    cb = function cb() {
      var _arguments = Array.prototype.slice.call(arguments),
          err = _arguments[0],
          args = _arguments.slice(1);

      if (err) return reject(err);
      resolve.apply(undefined, _toConsumableArray(args));
    };
  });
  cb.promise = promise;
  return cb;
};

exports = module.exports = createPromiseCallback;
exports.createPromiseCallback = createPromiseCallback;
exports.Promise = require('bluebird');
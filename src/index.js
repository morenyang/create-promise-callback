const createPromiseCallback = () => {
  let cb
  if (!global.Promise) {
    global.Promise = require('bluebird')
  }

  const promise = new global.Promise((resolve, reject) => {
    cb = function () {
      const [err, ...args] = arguments
      if (err) return reject(err)
      resolve(...args)
    }
  })
  cb.promise = promise
  return cb
}

exports = module.exports = createPromiseCallback
exports.createPromiseCallback = createPromiseCallback
exports.Promise = require('bluebird')

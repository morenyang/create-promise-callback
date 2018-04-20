'use strict';

const assert = require('chai').assert;
const createPromiseCallback = require('../lib/index');

function func(err, fn) {
  fn = fn || createPromiseCallback();
  setTimeout(() => {
    if (err) return fn(err);
    fn(null, 'done');
  }, 0);
  return fn.promise;
}

function multiArgsFunc(args, fn) {
  fn = fn || createPromiseCallback();
  setTimeout(() => {
    fn(null, ...args);
  }, 0);
  return fn.promise;
}

describe('create-promise-callback module', () => {
  it('should callback with "done"', done => {
    func(null, (err, res) => {
      assert.notOk(err);
      assert.equal(res, 'done');
      done();
    });
  });

  it('should reslove with "done"', done => {
    func(null).then(res => {
      assert.equal(res, 'done');
      done();
    });
  });

  it('should callback with error', done => {
    const error = new Error('error');
    func(error, (err, res) => {
      assert.equal(err, error);
      assert.notOk(res);
      done();
    });
  });

  it('should reject promise with error', done => {
    const error = new Error('error');
    func(error)
      .then(res => {
        assert.notOk(res);
      })
      .catch(err => {
        assert.equal(err, error);
        done();
      });
  });

  it('should reslove with multi arguments', done => {
    const args = [1, 2, 3];
    multiArgsFunc(args)
    .then((arg1, arg2, arg3) =>{
      assert.deepEqual([arg1, arg2, arg3][1,2,3])
      done();
    })
  });

  describe('using module without Promise', () =>{
    before(() =>{
      delete global.Promise;
    })
  
    it('should use bluebird if global.Promise not defined', done =>{
      func(null).then(res => {
        assert.equal(res, 'done');
        done();
      });
    })
  })

});

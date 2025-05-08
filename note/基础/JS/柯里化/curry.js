/**
 * 将函数进行柯里化
 * @param {Function} fn 需要柯里化的函数
 * @param {Number} len 函数参数长度
 * @returns 柯里化函数
 */
function curry(fn, len = fn.length) {
  return _curry.call(this, fn, len);
}

/**
 * 柯里化中转函数，递归函数，递归条件传入的参数长度小于函数长度值
 * @param {Function} fn 需要柯里化的函数
 * @param {Number} len 函数参数长度
 * @param  {...any} args 函数的参数
 * @returns 柯里化的函数
 */
function _curry(fn, len, ...args) {
  return function (...params) {
    const _args = [...args, ...params];
    if (_args.length >= len) {
      return fn.apply(this, _args);
    } else {
      return _curry.call(this, fn, len, ..._args);
    }
  };
}

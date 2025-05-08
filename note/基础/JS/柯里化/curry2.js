function _curry(fn, len, holder, args, holderIndexArr) {
  const _args = args.slice();
  const _holderIndexArr = holderIndexArr.slice();
  return function (...params) {
    params.forEach((arg, i) => {
      if (!holderIndexArr.length) {
        _args.push(arg);
        if (arg === holder) {
          _holderIndexArr.push(_args.length - 1);
        }
      } else {
        if (arg !== holder) {
          const holderIndex = _holderIndexArr.shift();
          _args.splice(holderIndex, 1, arg);
        } else {
          _args.push(arg);
          _holderIndexArr.push(_args.length - 1);
        }
      }
    });
    if (
      _args.length >= len &&
      _args.slice(0, len).every((arg) => arg !== holder)
    ) {
      return fn.apply(this, _args);
    } else {
      return _curry(fn, len, holder, _args, _holderIndexArr);
    }
  };
}

function curry(fn, len = fn.length, holder = curry) {
  return _curry(fn, len, holder, [], []);
}

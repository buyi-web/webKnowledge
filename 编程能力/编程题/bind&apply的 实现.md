## 封装 bind 方法

```js
/**
 * 简单版本
 */
Function.prototype.myBind = (that, ...args) => {
  const funcThis = this;
  return function (..._args) {
    return funcThis.apply(that, args.concat(_args));
  };
};
```

[解析 bind 原理，并手写 bind 实现](https://github.com/sisterAn/JavaScript-Algorithms/issues/81)

## 封装 apply 方法

```js
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  context.fn = this;
  let result;
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
```


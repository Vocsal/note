const [PENDING, FULFILLED, REJECTED] = ["PENDING", "FULFILLED", "REJECTED"];

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulFilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (...args) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = args;
        this.onFulFilledCallbacks.forEach((callback) => callback());
      }
    };

    const reject = (...args) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = args;
        this.onRejectedCallbacks.forEach((callback) => callback());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === "function" ? onFulFilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    if (this.status === FULFILLED) {
      onFulFilled(...(this.value || []));
    }
    if (this.status === REJECTED) {
      onRejected(...(this.reason || []));
    }
    if (this.status === PENDING) {
      this.onFulFilledCallbacks.push(() => {
        onFulFilled(...(this.value || []));
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(...(this.reason || []));
      });
    }
  }
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1");
  }, 1000);
  setTimeout(() => {
    reject("2");
  }, 1000);
});

promise.then(
  (value) => {
    console.log(value);
  },
  (err) => {
    console.error(err);
  }
);

console.log("3");

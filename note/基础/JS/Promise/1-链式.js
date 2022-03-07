const [ PENDING, FULFILLED, REJECTED ] = [ "PENDING", "FULFILLED", "REJECTED" ];

function resolvePromise(promise2, thenRet, resolve, reject) {
    if(promise2 === thenRet) {
        return reject(new TypeError("Chaning cycle detected for promise #<Promise>"));
    }

    let called = false;
    if((typeof thenRet === "object" && thenRet != null) || typeof thenRet === "function") {
        try {
            const then = thenRet.then;
            if(typeof then === "function") {
                then.call(thenRet, fulfilledValue => {
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, fulfilledValue, resolve, reject);
                }, rejectedValue => {
                    if(called) return;
                    called = true;
                    reject(rejectedValue);
                })
            } else {
                resolve(thenRet);
            }
        } catch(err) {
            if(called) return;
            called = true;
            reject(err);
        }
    } else {
        resolve(thenRet);
    }
}


class Promise {
    constructor(executor) {
        // 默认状态为 pending
        this.status = PENDING;
        // 存放成功状态的值，默认为 undefined
        this.value = undefined;
        // 存放失败状态的值，默认为 undefined
        this.reason = undefined;

        // 存放成功回调
        this.onResolvedCallback = [];
        // 存放失败回调
        this.onRejectedCallback = [];

        // 调用此方法即为成功
        let resolve = (value) => {
            // 状态为pending时才可以更新状态，防止executor中调用两次 resolve/rejevt 方法
            if(this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallback.forEach(callback => callback());
            }
        }

        // 调用此方法即为失败
        let reject = (reason) => {
            // 状态为pending时才可以更新状态，防止executor中调用两次 resolve/rejevt 方法
            if(this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallback.forEach(callback => callback());
            }
        }

        try {
            // 立即执行，将 resolve 和 reject 函数传给使用者
            executor(resolve, reject);
        } catch (err) {
            // 发生异常时执行失败逻辑
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        const promise = new Promise((resolve, reject) => {
            if(this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        const thenRet = onFulfilled(this.value);
                        resolvePromise(promise, thenRet, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0)
            }
            if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const thenRet = onRejected(this.reason);
                        resolvePromise(promise, thenRet, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, 0)
            }
            if(this.status === PENDING) {
                // 如果状态时pending，则先将 onFulfilled 和 onRejected 存起来，等待状态确定后，再执行
    
                this.onResolvedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const thenRet = onFulfilled(this.value);
                            resolvePromise(promise, thenRet, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0)
                });
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const thenRet = onRejected(this.reason);
                            resolvePromise(promise, thenRet, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    }, 0)
                });
            }
        })
        return promise;
    }
}

new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('1');
        resolve("1");
    }, 1000);
}).then((value) => {
    console.log('2', value);
}).then((value) => {
    console.log('3', value);
    return '4';
}).then((value) => {
    console.log('4', value)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("5");
        }, 1000);
    })
}).then((value) => {
    console.log('5', value);
})

console.log(0)
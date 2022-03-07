const [ PENDING, FULFILLED, REJECTED ] = [ "PENDING", "FULFILLED", "REJECTED" ];

const resolvePromise = (promise, thenRet, resolve, reject) => {
    if(promise === thenRet) {
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
                    resolvePromise(promise, fulfilledValue, resolve, reject);
                }, rejectedValue => {
                    if(called) return;
                    called = true;
                    reject(rejectedValue);
                });
            } else {
                resolve(thenRet);
            }
        } catch (e) {
            if(called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(thenRet);
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulFilledCallbacks = [];
        this.onRjectedCallbacks = [];

        const resolve = (...args) => {
            if(this.status === PENDING) {
                this.status = FULFILLED;
                this.value = args;
                this.onFulFilledCallbacks.forEach(callback => callback());
            }
        }
        const reject = (...args) => {
            if(this.status === PENDING) {
                this.status = REJECTED;
                this.reason = args;
                this.onRjectedCallbacks.forEach(callback => callback());
            }
        }

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        const promise = new Promise((resolve, reject) => {
            if(this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        const thenRet = onFulfilled(...(this.value || []));
                        resolvePromise(promise, thenRet, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const thenRet = onRejected(...(this.reason || []));
                        resolvePromise(promise, thenRet, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            }
        });
        return promise;
    }

    static resolve(...args) {
        return new Promise((resolve, reject) => {
            resolve(...args);
        })
    }

    static reject(...args) {
        return new Promise((resolve, reject) => {
            reject(...args);
        })
    }

    catch(callback) {
        return this.then(null, callback);
    }

    finally(callback) {
        return this.then((...args) => {
            return Promise.resolve(callback()).then(() => args);
        })
    }
}
/**
 * @description 本文件总结记录js中常用重要的代码片段，高内聚，低耦合
 * @author zhangyinggui <yingguizhang@126.com> 2020.08.12
 */

/**
 * apply, call, bind
 * 共同点：都可以改变所绑定方法的this指向，指定绑定方法的参数
 * 区别：
 * apply与call区别：指定方法的参数形式不一样，apply通过传入一个数组，call分别将参数进行传入，fn.apply(thisArg, [a, b]), fn.call(thisArg, a, b)
 * apply\call与bind区别：apply与call绑定方法后会立即执行，而bind是创建一个新的函数，需要手动调用，fn.bind(thisArg, a, b)()
 */

/**
 * @description 防抖，在一系列触发 时延 后，执行一次回调函数
 * @param {Function} func 回调函数，防抖触发的回调函数
 * @param {Number} delay 时延，单位毫秒，默认值为300
 * @returns 返回一个防抖函数
 */
function debounce(func, delay = 300) {
    let timeout = null;
    return function() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, arguments);
            // func.call(this, ...arguments);
        }, delay)
    }
}

/**
 * @description 节流，在一系列触发中，每间隔 一段时延 就执行回调函数
 * @param {Function} func 回调函数，节流触发的回调函数
 * @param {Number} delay 时延，单位毫秒，默认值为300
 * @returns 返回一个节流函数
 */
function throttle(func, delay = 300) {
    let timeout = null;
    return function() {
        if(timeout) return
        func.apply(this, arguments);
        // func.call(this, ...arguments);
        timeout = setTimeout(() => {
            timeout = null;
        }, delay);
    }
}

/**
 * @description 将Date对象转换成字符串
 * @param {Date} date 表示日期的Date对象
 * @returns 返回一个日期字符串
 */
function converDate(date) {
    let year = date.getFullYear(); // 年份
    let month = date.getMonth() + 1; // 月份
    month = (month < 10) ? "0" + month : month;
    let day = date.getDate();
    day = (day < 10) ? "0" + day : day;

    return year + "-" + month + "-" + day;
}

/**
 * @description 将Date对象或数组 转换成 字符串String
 * @param {String | Date | Array} date 表示日期的数据
 * @returns 返回一个日期字符串
 */
function converTime(date) {
    let type = Object.prototype.toString.call(date);
    let ret = "";
    switch (type) {
        case "[object Date]":
            ret = converDate(date);
            break;
    
        case "[object Array]":
            let retArray = [];
            for(let item of date) {
                let itemType = Object.prototype.toString.call(item);
                if(itemType === "[object String]") {
                    retArray.push(item);
                } else if(itemType === "[object Date]") {
                    retArray.push(converDate(item));
                }
            }
            ret = retArray.join(" ~ ");
            break;
    
        case "[object String]":
        default:
            ret = date;
            break;
    }
    return ret;
}

/**
 * @description 生成能够获取自增id的对象，对象拥有set与get方法
 * @param {Number} init 初始值
 * @param {Number} stepIncrement 自增步长
 */
function id(init = 0, stepIncrement = 1) {
    let id = init;
    let increment = stepIncrement;
    return {
        set(val = 0, stepIncrement2) {
            id = val;
            increment = stepIncrement2 ? stepIncrement2 : increment;
        },
        get() {
            id += increment;
            return id - increment;
        }
    }
}

// 装饰器
function singleClick(func, manuDone = false) {
    let lock = false;
    return function(...args) {
        if(lock) return
        lock = true;
        let done = () => lock = true;
        if(manuDone) return func.call(this, ...args, done);
        let promise = func.call(this, ...args);
        promise ? promise.finally(done) : done;
        return promise;
    }
}

function getType(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
}

/**
 * 解决问题：
 * 循环引用
 * 相同引用
 * 不同的类型（Function, Reg, Symbol等）
 * @description JS深拷贝
 * @param {*} obj 
 */
function deepClone(obj) {
    let copyed_objs = []; // 此数组解决循环引用和相同引用问题，存放已经递归的目标对象
    function deepCopy(target) {
        const type = Object.prototype.toString.call(target).slice(8, -1);
        if(type === "Object" || type === "Array") {
            for(let i = 0, l = copyed_objs.length; i < l; i++) {
                if(copyed_objs[i].target === target) {
                    return copyed_objs[i].copyTarget;
                }
            }
            let copyTarget = type === "Object" ? {} : [];
            copyed_objs.push({target, copyTarget});
            Object.keys(target).forEach(key => {
                copyTarget[key] = deepCopy(target[key]);
            })
            return copyTarget;
        } else {
            return target
        }
    }
    return deepCopy(obj);
}

/**
 * @param {String} title 通知的标题
 * @param {Object} optiosn 一些操作项
 * @return {Object} notification
 */
function notify(title, options = {}, closeDelay = 3000) {
    let notification = null;
    if(!("Notification" in window)) {
        console.warn("This browser doesn't support desktop notifications");
        alert("This browser doesn't support desktop notifications");
    } else if(Notification.permission === "granted") {
        notification = new Notification(title, options);
    } else if(Notification.permission !== "denied") {
        Notification.requestPermission((permission) => {
            if(permission === "granted") {
                notification = new Notification(title, options);
            } else {
                console.warn("You need change the permission of notification in browser settting.")
            }
        })
    } else if(Notification.permission === "denied") {
        console.warn("You need change the permission of notification in browser settting.")
    }
    if(notification) {
        setTimeout(() => {
            notification.close()
        }, closeDelay)
    }
    return notification;
}

module.exports = {
    debounce,
    throttle,
    converTime,
    id,
    getType,
    deepClone,
    notify
}
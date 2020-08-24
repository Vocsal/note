const api = require("../JS");

// let now = new Date();

// console.log(api.converTime(now));

// console.log(api.converTime([new Date(now - 1000*60*60*24*7), now]))

// console.log(api.converTime([new Date(now - 1000*60*60*24*14), new Date(now - 1000*60*60*24*7), now]))


// let debounceTest = api.debounce(function(s) {
//     console.log("debounce", s);
// });
// let throttleTest = api.throttle(function(s) {
//     console.log("throttle", s);
// })

// let i = 0;
// let s = "";
// let timer = setInterval(() => {
//     s += i;
//     debounceTest(s);
//     throttleTest(s);
//     i++;
//     if(i === 100) {
//         clearInterval(timer);
//     }
// }, 100)

// const ID = api.id(7, 2);
// const ID2 = api.id();
// let i = 0;
// while(i < 20) {
//     i++;
//     console.log('id', ID.get(), 'id', ID2.get());
// }

// 深拷贝
// let obj = {
//     a: 1,
//     b: "123",
//     c: new Date(),
//     d: function() {
//         return this;
//     },
//     e: ["f", {
//         g: {
//             h: "456"
//         }
//     }],
//     i: {
//         j: ["k", ["l", "m"]]
//     }
// }
// console.log("obj", obj);
// let obj2 = obj;

// let coptObj = api.deepClone(obj);
// console.log("copyObj", coptObj);

// console.log(obj === obj2);
// console.log(obj == coptObj);

// obj2.i.j[1] = 789;

// console.log("this", obj, obj2, coptObj);

// 深拷贝 相同应用
// let obj = {
//     a: "123"
// }

// let obj2 = {
//     b: "456",
//     c: obj,
//     d: obj
// }

// let coptObj = api.deepClone(obj2);

// obj.a = 789;
// coptObj.c.a = 789;

// console.log("this", obj, obj2, coptObj);

// 深拷贝 循环引用

// let obj = {
//     a: "123",
//     sourceLink: null
// }
// let obj2 = {
//     b: "456",
//     source: obj
// }
// obj.sourceLink = obj2;

// let copyObj = api.deepClone(obj);
// // console.log(obj, obj2, copyObj);

// copyObj.a = 789;
// console.log(copyObj, copyObj.sourceLink.source.a);
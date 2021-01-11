/**
 * @description 本文件总结记录js中基础进行一些总结
 * @author zhangyinggui <yingguizhang@126.com> 2020.08.12
 */


/* Global Objects */
/* String */
String = {
    // 属性
    length: Number,
    // 方法
    fromCharCode: Function, // 通过一串 Unicode 创建字符串
    fromCodePoint: Function, //通过一串 码点 创建字符串
    raw: Function, // 通过模板字符串创建字符串 
    prototype: {
        charAt, // 返回特定位置的字符串
        charCodeAt, // 返回给定索引的Unicode值
        codePointAt, // 返回使用UTF-16编码的给定位置的值的非负整数
        concat, // 连接两个字符串，返回一个新的字符串
        endsWith,
        includes,
        indexOf,
        lastIndexOf,
        localeCompare, // 返回一个数字表示是否引用字符串在排序中位于比较字符串的前面，后面，或者二者相同
        match, // 使用正则表达式与字符串比较
        matchAll,
        normalize,
        padEnd,
        padStart, // 在当前字符串尾部或头部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串
        repeat,
        replace,
        search,
        slice,
        split,
        startsWith,
        substring,
        toLocaleLowerCase,
        toLocaleUpperCase,
        toLowerCase,
        toString,
        toUpperCase,
        trim,
        trimRight,
        trimLeft,
        valueOf
    }
}
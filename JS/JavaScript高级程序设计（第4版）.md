# JavaScript高级程序设计（第4版）

## 第2章 HTML中的JavaScript

### 2.1 `<script>`元素

 `<script>`元素有8个属性：

| 属性        | 含义                                                         | 备注                                                         |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| async       | 表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。异步。 | 可选                                                         |
| charset     | 使用src属性指定的代码字符集，这个属性很少使用，大多浏览器不在乎这个值 | 可选                                                         |
| crossorigin | 配置相关请求的CORS（跨域资源共享）设置。默认不适用CORS。     | 可选<br />crossorigin="anonymos"配置文件请求不必设置凭据标志。<br />crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。 |
| defer       | 表示脚本可以延迟到文档完全被解析和显示之后再执行。           | 可选。只对外部脚本有效。                                     |
| integrity   | 允许比对接收到的资源和指定的加密签名以验证子资源完整性SRI。  | 可选                                                         |
| language    | 最初用于表示代码块中的脚本语言                               | 废弃                                                         |
| src         | 指定要执行的外部脚本地址。                                   | 可选，可跨域                                                 |
| type        | 代替language，表示代码块中脚本语言的内容类型（也称MIME类型）。 | 可选。<br />"text/javascript"<br />"text/ecmascript"<br />"application/x-javascript"<br />"application/javascript"<br />"application/ecmascript"<br />"module" |

## 第3章 语言基础

> let声明的范围是块作用域，而var声明的范围是函数作用域。

var, let, const的区别?

6个基本数据类型：`Undefined`, `Null`, `Boolean`, `Number`, `String`, `Symbol`

- 位操作符

按位非 ~

按位与 &

按位或 |

按位异或 ^

左移 <<

有符号右移 >>

无符号右移 >>>
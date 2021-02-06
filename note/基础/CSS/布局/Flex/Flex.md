# Flex 弹性布局

---

# 基础概念

Flex => Flexible Box 弹性盒子
```css
.box {
    display: flex;
}
// 行内元素
.box {
    display: inline-flex;
}
// Webkit 内核
.box {
    display: -webkit-flex; /* Safari */
    display: flex;
}
```
设置为flex布局后，子元素的`float`、`clear`和`vertical-align`属性将失效.

采用flex布局的元素为 **容器**
容器子元素自动成为容器成员为 **项目**

容器拥有两个**轴**
水平的主轴 main axis    垂直的交叉轴 cross axis
主轴开始位置 main start 结束位置 main end
交叉轴开始位置 cross start 结束位置 cross end
项目默认沿主轴排列，单个项目占据主轴空间为 main size,占据交叉轴空间 cross size




# 容器属性
>
`flex-direction`
`flex-wrap`
`flex-flow`
`justify-content`
`align-items`
`align-content`

- `flex-direction`
决定主轴的方向，即项目排列的方向
```css
.box {
    display: flex;
    flex-direction: row | row-reverse | column | column-reverse;
}
```

- `flex-wrap`
项目都排列在轴线上，此属性决定是否换行，默认不换行
```css
.box {
    display: flex;
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```
其中`wrap-reverse`属性值表示的意思是每一行多余元素换行到此行的上方


- `flex-flow`
是`flex-direction`和`flex-wrap`的简写形式，默认值为`row wrap`
```css
.box {
    flex-flow: <flex-direction> <fle-wrap>;
}
```

- `justify-content`
定义主轴项目的对齐方式
```css
.box {
    display: flex;
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
`flex-start` 默认值 起点对齐
`flex-end` 终点对齐
`center` 居中
`space-between` 两端对齐，项目间隔相等
`space-around` 项目两侧间隔相等

- `align-items`
定义项目交叉轴的对齐方式
```css
.box {
    display: flex;
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```
`baseline` 项目第一行文字的基线对齐
`stretch` 默认值 若项目未设置高度或auto，项目将占满整个容器高度

- `align-content`
定义多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用
```css
.box {
    display: flex;
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
`flex-start` 与交叉轴起点对齐
`flex-end` 与交叉轴终点对齐
`center` 与交叉轴中点对齐
`space-between` 与交叉轴两端对齐，轴线间隔相等
`space-around` 每个轴线两侧间隔相等
`stretch` 默认值 轴线占满整个交叉轴



# 项目属性
>
`order`
`flex-grow`
`flex-shrink`
`flex-basis`
`flex`
`align-self`

- `order`
定义项目的排列顺序，属性值为数值，属性值越小，排列越前，默认 0
```css
.item {
    order: <integer>;
}
```

- `flex-grow`
定义项目的放大比例，默认为0，即存在剩余空间，也不放大
```css
.item {
    flex-grow: <number>;
}
```
所有项目中`flex-grow`都为1，则项目将等分空间，如果一个项目`flex-grow`值为2，则其空间是其他项目的两倍

- `flex-shrink`
定义项目的缩小比例，默认为1，即空间不足，项目将缩小
```css
.item {
    flex-shrink: <number>;
}
```
若所有项目`flex-shrink`的值都为1，当空间不足时，都将等比例缩小，如果一个项目`flex-shrink`值为0，则空间吧不足时，此项目不缩小

- `flex-basis`
定义在分配多余空间之前，项目占据主轴的空间，默认值 `auto`
```css
.item {
    flex-basis: <length> | auto;
}
```

- `flex`
属性`flex-grow`, `flex-shrink`, `flex-basis`的简写形式，默认为 `0 1 auto`
```css
.item {
    flex: none | [<flex-grow> <flex-shrink> || <flex-basis>];
}
```
有两个快捷属性值 `auto` = `1 1 auto` 和 `none` = `0 0 auto`

- `align-self`
允许单个项目与其他项目不一样的对齐方式，覆盖容器`align-items`属性，默认值 `auto` 继承父元素`align-items`值
```css
.item {
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
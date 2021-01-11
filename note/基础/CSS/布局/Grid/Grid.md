# Grid 网格布局

---

网格布局，采用网格布局的区域称为 容器container，容器内部网格定位的顶层子元素成为 项目item。

容器  项目
行 列
行与列交叉部分为 单元格
m行 n列 m*n单元格
网格线 grid line
水平网格线划分 行，垂直网格先划分 列
m行 m+1条水平网格线，n列 n+1条垂直网格线'

## 属性
```css
.container {
	display: grid;
}
```


- **inline-grid**
默认情况下，容器元素为块级元素，可设为行内元素

```css
.container {
	display: inline-grid;
}
```

网格布局中，容器子元素（项目）的float, display: inline-block, display: table-cell, vertical-align 和 column-* 等失效



- `grid-template-columns` 和 `grid-template-rows` 属性
grid-template-columns定义每一列的列宽
grid-template-rows定义每一行的行高
```css
.container {
	display: grid;
	grid-template-columns: 100px 100px 100px;
	grid-template-rows: 100px 100px 100px;
}
```
三行三列，列宽行高都为100px(长度单位)



- repeat() 函数
简化重复的值
```css
.container {
	display: grid;
	grid-template-columns: repeat(3, 33.33%);
	grid-template-rows: repeat(3, 33.33%);
}
```
两个参数，重复的次数，重复的值
`grid-template-columns: repeat(2, 100px 20px 80px);`



- auto-fill 关键字
单元格大小固定，让单元格自动填充到容器每一行(列)
```css
.container {
	display: grid;
	grid-template-columns: repeat(auto-fill, 100px);
}
```


- fr 关键字
fraction 片段
```css
.container {
	display: grid;
	grid-template-columns: 1fr 2fr;
}
```
上述代码表示，容器划分为两列，第2列是第1列的 2倍
`grid-template-columns: 1fr 2fr;` 等价于 `grid-template-columns: 33.33% 66.66%;`
`grid-template-columns: 1fr 1fr;` 等价于 `grid-template-columns: 50% 50%;`
`grid-template-columns: 150px 1fr;` 等价于 `grid-template-columns: 150px calc(100% - 150px);`



- minmax() 函数
产生一个长度范围
`grid-template-columns: 1fr 1fr minmax(100px, 1fr);`
第3列列宽不小于100px, 不大于1fr


- auto 关键字
由浏览器决定长度



- 网格线名称
grid-template-columns和grid-template-rows中可使用方括号指定每一根网格线名称，方便后面引用

```css
.container {
	display: grid;
	grid-template-columns: [c1] 100px [c2] 100px [c3] 100px [c4];
	grid-template-rows: [r1] 100px [r2] 100px [r3] 100px [r4];
}
```

- 两栏式布局
```css
.container {
	display: grid;
	grid-template-columns: 70% 30%;
}
```
12网格布局 `grid-template-columns: repeat(12, 1fr);`



- `grid-row-gap`, `grid-column-gap` 和 `grid-gap` 属性
行间距，列间距
```css
.container {
	display: grid;
	grid-row-gap: 20px;
	grid-column-gap: 20px;
}
```

- grid-gap为合并简写形式
`grid-gap: <grid-row-gap> <grid-column-gap>;`
`grid-gap: 20px;`表示行间距与列间距都为20px
最新标准，`grid-`前缀已删除，为`row-gap`, `column-gap` 和 `gap`


- `grid-template-areas`属性
对单元格区域命名
```css
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: repeat(3, 100px);
    grid-template-areas: 'a b c'
                         'd e f'
                         'g h i';
}
```

- `grid-auto-flow`属性
决定元素的排列顺序关系
`grid-auto-flow: row;` 按行依次排列
`grid-auto-flow: column;` 按lie依次排列
`grid-auto-flow: row dense;` 按行依次紧密排列，空白区域会被元素填充
`grid-auto-flow: column dense;` 按列依次紧密排列，空白区域会被元素填充


- `justify-items`, `align-items`, `place-items` 属性
`justify-items`属性设置单元格内容的水平位置，`align-items`属性设置单元格内容的垂直位置
`place-items`是上述两个属性的合并简写形式
`place-items： <align-items> <justify-items>;` 忽略第二个值，则视为两个值相同。
其中，属性值如下：
satrt: 对齐单元格起始边缘；
end: 单元格结束边缘；
center: 单元格内部居中；
stretch: 拉伸，占满单元格的整个宽度（默认值）.


- `justify-content`, `align-content`, `place-content` 属性
以上属性表示整个内容区域在容器里的位置
items表示单元格，content表示内容区域
items相对于content, content相对于容器
```css
.container {
    justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
    align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```
space-around: 每个项目两侧的间隔相等，项目之间的间隔比项目与容器边框的间隔大一倍；
space-between: 项目与项目的间隔相等，项目于容器之间没有间隔；
space-evenly: 项目与项目、项目与容器的间隔相等。


- `grid-auto-columns`, `grid-auto-rows`属性
指定多余网格的行高与列宽，如果不设置这个属性，则根据单元格内容决定行高与列宽


- **`grid-template`, `grid`属性**
grid-template属性是grid-template-columns、grid-template-rows和grid-template-areas这三个属性的合并简写形式。
grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式。


以下为项目属性
- `grid-column-start`, `grid-column-end`, `grid-row-start`, `grid-row-end`
指定项目的位置，指定项目的开始与结束的 网格线。
属性值还可使用`span`关键字，表示“跨越”，及项目边框之间跨越多少个网格。

- `grid-column`, `grid-row`属性
此两个属性为上面四个属性的合并简写形式。


- `justify-self`, `align-self`, `place-self`
此三个属性设置单元格内容的位置，与`xxx-items`属性的用法一致，只能作用于项目。
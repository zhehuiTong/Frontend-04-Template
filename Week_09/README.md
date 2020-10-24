# 学习笔记

## 1.CSS总论

### 1.1 at-rules CSS@规则

- @charset `在外部样式表文件内使用。指定该样式表使用的字符编码`
- @import `用于从其他样式表导入样式规则`
- @media `您可以指定一个媒体查询和一个CSS块，当且仅当该媒体查询与正在使用其内容的设备匹配时，该CSS块才能应用于该文档` 常用at-rules
- @page `用于在打印文档时修改某些CSS属性`
- @counter-style 
- @keyframes `通过在动画序列中定义关键帧（或waypoints）的样式来控制CSS动画序列中的中间步骤` 常用at-rules
- @fontface `指定一个用于显示文本的自定义字体` 常用at-rules
- @support
- @namespace

### 1.2 CSS普通规则

- Selector
  - selector_group
  - selctor
    - `>` div>p `选择所有父级是 <div> 元素的 <p> 元素`
    - `<sp>` div p `选择<div>元素内的所有<p>元素`
    - `+` div+p `选择所有紧接着<div>元素之后的<p>元素`
    - `~` div~p `将<div>后面所有的<p>标签选中`
  - simple_selector
    - `type` div `类型选择器`
    - `*` `选择所有元素`
    - `.` .intro `选择所有class="intro"的元素`
    - `#` #firstname `选择所有id="firstname"的元素`
    - `[]` `属性选择器`
    - `:` `伪类`
    - `::` `伪元素`
    - `:not()` `非选择器`

## 2.CSS选择器

### 2.2 选择器语法

- 简单选择器
  - *
  - div svg|a
  - .class
  - #id
  - [attr=value]
  - :hover
  - ::after
- 复合选择器
  - <简单选择器> <简单选择器> <简单选择器>
  - *或者 div 必须写在前面
- 复杂选择器
  - <复合选择器> <sp> <复合选择器>
  - <复合选择器> ">" <复合选择器>
  - <复合选择器> "~" <复合选择器>
  - <复合选择器> "+" <复合选择器>
  - <复合选择器> "||" <复合选择器>

### 2.3 选择器优先级

- 优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下
  - 如果存在内联样式，那么 A = 1, 否则 A = 0
  - B 的值等于 ID选择器 出现的次数
  - C 的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数
  - D 的值等于 标签选择器 和 伪元素 出现的总次数 
`比较规则是: 从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的`

### 2.3 选择器伪类

- 链接/行为
  - :any-link `一个有链接锚点的元素，而不管它是否被访问过`
  - :link :visited
  - :hover `选择鼠标指针浮动在其上的元素`
  - :active `选择激活的链接`
  - :focus `选择获得焦点的输入字段`
  - :target
- 树结构 `带last和empty的伪类元素不建议使用，因为会计算css回溯算法，影响性能`
  - :empty `指定空的元素`
  - :nth-child() `规定属于其父元素的第几个子元素`
  - :nth-last-child() `规定属于其父元素的倒数第几个子元素`
  - :first-child :last-child :only-child
- 逻辑型
  - :not伪类
  - :where :has

### 2.4 选择器伪元素

- ::before 节点之前插入元素
- ::after 节点后插入元素
- ::first-line 首行
- ::first-letter 首页字符

思考题：为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

`first-letter 是将<first-letter>a</first-letter>包裹首个字符，而first-line则不能使用这种方式，因为首行字符数是不可控的，不同屏幕尺寸或者字体大小会影响首行渲染`
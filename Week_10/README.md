# 学习笔记

## 1.css排布
   
### 1.1 盒模型

- `content-box` 盒宽度 = 内容宽度;
- `border-box` 盒宽度 = margin宽度 + padding宽度 + 内容宽度

### 1.2 正常流排布

- 收集盒进行
- 计算盒在行中的排布
- 计算行的排布

### 1.3 块级排布

- float与clear
- BFC
  - margin折叠
  - BFC合并
    - Block Container 里面有BFC的
    - Block-level Box 外面有BFC的
    - Block Box = Block Container + Block-level Box：里外都有BFC的
  - 设立BFC
    - floats 浮动元素
    - 绝对定位元素
    - block containers inline-blocks, table-cells, and table-captions
    - overflow属性不是visible 

## 2. 动画
  
- Animation
  - animation-name 时间曲线
  - animation-duration 动画的时长；
  - animation-timing-function 动画的时间曲线；
  - animation-delay 动画开始前的延迟；
  - animation-iteration-count 动画的播放次数；
  - animation-direction 动画的方向

- Transition
  - transition-property 要变换的属性；
  - transition-duration 变换的时长；
  - transition-timing-function 时间曲线；
  - transition-delay 延迟
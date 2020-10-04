# 学习笔记

## 1.浏览器工作原理总论

- `URL` -- http --> `HTML` --parse-->`DOM`--css computing-->`DOM with CSS`-- layout --> `DOM with position` --render-->`Bitmap`

## 2.有限状态机

- 每一个状态都是一个机器
  - 在每一个机器里，我们可以做计算，存储，输出...
  - 所有的这些机器接受的输入是一致的
  - 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）

- 每一个机器都知道下一个状态
  - 每个机器都有确定的下一状态（Moore）
  - 每个机器根据输入决定下一个状态（Mealy）

## 3.HTTP请求

### 3.1 ISO-OSI七层网络模型

- （`物理层`-`数据链路`）--> `4G/5G/WI-FI`
- `网络`-->`Internet`
- `传输`-->`TCP`-->require('net')
- (`会话`-`表示`-`应用`)-->`HTTP`-->require('http')

### 3.2 TCP与IP的一些基础知识

- `流` 是传输数据的概念
- `端口` 指定数据包怎么分给各个应用
- `require('net')`
- `包` 数据包
- `IP地址`
- `libnet/libpcap`

### 3.3 HTTP请求总结

- 设计一个HTTP请求的类
- content type是一个必要的字段，要有默认值
- body是KV格式
- 不同的content-type影响body的格式
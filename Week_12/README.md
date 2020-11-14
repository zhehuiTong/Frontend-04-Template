# 学习笔记

## 1.组件的基本知识

### 1.1 组件的基本概念和基本组成部分

- 对象
  - `Properties` 属性
  - `Methods` 方法
  - `Inherit` 继承
- 组件
  - `Properties` 属性(强调从属关系)
  - `Methods` 方法
  - `Inherit` 继承
  - `Attribute` 属性(强调描述性)
  - `Config & State`
  - `Event`
  - `Lifecycle`
  - `Children`
- 如何设计组件状态

|            | Markup set  | JS set          | JS Change | User Input Change |
| :--------: | :-----------------: | :-------------------: | :------: | :--------: |
| Properties     | X                  | o | 0 | ？         |
| Attribute     | 0 | 0                    | 0 | ？         |
| state    | X | X  | X       | 0         |
| config | X                | 0         | X   | X         |
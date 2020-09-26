### 学习笔记
# 1. 运算符和表达式
## 1.1 Expressions
  `Member`优先级最高。
    · Member
     · a.b
     · a[b]
     · foo`string`
     · super.b
     · super["b"]
     · new.target
     · new Foo() `不带括号的new为单独设为一个优先级，称为New Expressions`

## 1.2 Reference
  a.b `这实例a从b属性取出来的不是属性的值，而是一个引用，并且该引用不是JavaScritp的7种基本类型之一，它属于标准中的类型引用`
  `Reference`分为两部分，一部分是对象，一部分是key
  · Object
  · Key
  · delete
  · assign
## 1.3 Call
  `Call`优先级低于new,同时也低于前面所有的Member运算，`但是如果括号后面加上.取属性时表达式降级为Call Expressions`
  · foo()
  · super()
  · foo().b
  · foo()['b']
  · foo()`b`

## 1.4 Left Handside & Right Handside
  · a.b = c
  · a + b = c

## 1.5 Update
  · a ++
  · a --
  · -- a
  · ++ a
## 1.6 Unary
  · delete a.b
  · void foo()
  · typeof a
  · + a
  · - a
  · ~ a
  · !a
  · await a
## 1.7 Exponental
  · **
## 1.8 计算符号
  · Multiplcative `*` `/` `%`，自转为`Number`
  · Addtive `+` `-`，字符串、数字的相加
  · Shift `>>` `<<`  `>>>`
  · Relationship `<` `>` `<=` `>=` `instanceof` `in`
## 1.9 相等
  · == / !=
  · === / !==

## 1.10 Bitwise 位运算
  · & 按位与 
  · ^ 异或
  · | 按位或

## 1. 11 Logical 逻辑运算符
 · &&
 · ||

## 1.12 Conditional
 · ? : 三元

# 2.Type Convertion 类型转换

 `==`转换规则是不同类型就转换为Number在做比较，建议用`===`三等号做比较

##  2.1 基本类型转换规则，如图

|            | Number              | String                | Boolean  | Undefinded | Null | Object | Symbol |
| ---------- | ------------------- | --------------------- | -------- | ---------- | ---- | ------ | ------ |
| Number     | -                   |                       | 0 false  | x          | x    | Boxing | x      |
| String     |                     | -                     | "" false | x          | x    | Boxing | x      |
| Boolean    | true 1<br />false 0 | 'true'<br />'false'   | -        | x          | x    | Boxing | x      |
| Undefinded | NaN                 | 'Undefinded'          | false    | -          | x    | x      | x      |
| Null       | 0                   | 'null'                | false    | x          | -    | x      | x      |
| Object     | valueOf             | valueOf<br />toString | true     | x          | x    | -      | x      |
| Symbol     | x                   | x                     | x        | x          | x    | Boxing | -      |

## 2.2 UnBoxing 拆箱

· ToPremitive

· toString / valueOf

- 加法运算表达式优先调用`valueOf`
-  如果对象作为属性名，优先调用`toString`

· Symbol.toPremitive

- 任何情况下都是最优先调用

## 2.3 Boxing 装箱

`装箱`返回的是一个包装对象

| 类型    | 对象                    | 值          |
| ------- | ----------------------- | ----------- |
| Number  | new Number(1)           | 1           |
| String  | new String("a")         | "a"         |
| Boolean | new Boolean(true)       | true        |
| Symbol  | new Object(Symbol("a")) | Symbol("a") |

# 3. 语句 | 运行时相关概念

## 3.1 Completion Record

语句完成状态的记录。JS无法访问。

- `[[type]]`: normal break continue return throw

- `[[value]]`: 基本类型，值

- `[[target]]`: label

## 3.2 Lexical Environment

词法环境。es6中`let` `const`定义的变量将存在词法环境中。

# 4. 语句 | 简单语句和复合语句

## 4.1 简单语句

- ExpressionStatement 表达式

- EmptyStatement 空

- DebbugerStatement 断点

- ThrowStatement 抛错

- ContinueStatement 结束当次循环

- BreakStatement 跳出循环

- ReturnStatement 结束返回

## 4.2 复合语句

- BlockStatement

- IfStatement

- SwitchStatement

- IterationStatement 

- WithStatement with，高风险，内部作用域可能进入全局

- LabelledStatement 

- TryStatement

# 5. 声明 Declaration

- Function

- Generator

- AsyncFuntion

- AsyncGenerator

- VariableStatement `var` 变量提升，但赋值不提升，默认值为undefined

- Class 在声明前调用, 存在暂时性死区

- Lexical `let` `const`  跟class一样在声明前调用,存在暂时性死区

# 7.结构化 | 函数调用

## 7.1 调用栈

函数调用形成调用栈，栈环境表示执行上下文栈。

`Excution Context Stack`里包含：

- code evaluate state 用于（aysnc和generator）的上下文保存状态信息。

- Function

- Script or Module

- Generator Generator函数创建的上下文

- Realm 内置对象

- Lexical Environment 词法环境
  1. this
  2. new.target
  3. super
  4. 变量

- Variable Environment 变量环境，仅作var变量

## 7.2 Environment Record 环境记录/作用域链

- Declarative Environment Record
  1. Funcition Environment Record
  2. module Environment Record

- Global Environment Record 全局
- Object Environment Record with才用到

### 7.2.1 Function-Closure 函数闭包

`函数闭包`是每一个函数都会生成

```javascript
var y = 2;
function foo2(){
   console.log(y);
}
export foo2
```

Clousure 闭包：

- Environment Record 环境部分  `y:2`
- Code 代码部分 `console.log(y)`

## 7.3  Realm

- 在JS中，函数表达式和对象直接量均会创建对象
- 使用.做隐式转换也会创建对象
-  这些对象的原型就是Realm, `Realm`是JavaScritp标准对象的集合
- 不同`Realm`，原型是不一样的
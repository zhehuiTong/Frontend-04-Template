学习笔记
1. 地图
  1.1 通过findPath方法，找到最短路径
  1.2 先拷贝一份地图数据table用来存放所有能到达end点的路径
  1.3 把start存放到自定义的按照距离结束点最短距离排序的数据结构queue中
  1.4 不断循环从start点向四周的点放入到queue中，然后把start当做其他点的前置点存放到table里
  1.5 不断循环从queue中按照先进先出的顺序取出之前插入的点，并判断是否到指定的结束点，没有继续重复1.4步骤
  1.6 搜索到指定的结束点后， 倒退从table数据里取出前置点存放到path数组里，最后放回path

2. LL算法
  2.1 通过tokenize方法解析四则运算，用lastIndex存储正则匹配到字符串索引，默认为0，用result存储正则匹配到字符串信息，默认为null
  2.2 不断循环正则匹配source，如果resul为null或前个lastIndex与当前lastIndex差值小于0，就不需要解析source了
  2.3 把正则匹配到的result，存放到token对象的type里，type类型有（"Number", "Whitespace", "LineTerminator", "*", "/", "+", "-"），并值存放到token对象的value里，直到匹配结束返回EOF
  2.4 判断token的type不是空白符号或者换行符号，存放放到source数组里，以调用MultiplicativeExpression函数方法
  2.5 先判断source数组里第一位type是否是Number, 如果是新建node对象type改为MutiplicativeExpression，把source第一位对象存放到
  node对象children数组里，然后尾递归MultiplicativeExpression函数方法
  2.6 下次在判断source第一位type是否是MutiplicativeExpression，并且source数组第二位是否是"*"或者“/”,如果是新建node对象type改为MutiplicativeExpression，在node对象设置operator为"*"或者“/”，依次从source数组从头部取出值存到node的children里， 在把node放在source数组头部，然后尾递归MultiplicativeExpression函数方法
  2.7 不断重复递归，直到source第一位对象type为MultiplicativeExpression，返回source数组第一位
  2.8 加分运算优先调用MultiplicativeExpression
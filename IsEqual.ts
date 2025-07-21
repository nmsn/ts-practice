export type IsEqual<A, B> = (<G>() => G extends (A & G) | G ? 1 : 2) extends <
  G
>() => G extends (B & G) | G ? 1 : 2
  ? true
  : false;

/**
## 推导原理详解
### 1. 核心思想
这个类型利用了 TypeScript 中 函数类型的协变性 来检测两个类型是否完全相等。

### 2. 关键技巧：A & G | G
表达式 A & G | G 的行为：

- 当 A 是 any 时： any & G | G = any
- 当 A 不是 any 时： A & G | G = G
这是因为：

- any 与任何类型的交集都是 any
- 非 any 类型与 G 的交集再与 G 联合，结果就是 G
### 3. 函数类型比较
```
(<G>() => G extends A & G | G ? 1 : 2) 
extends
(<G>() => G extends B & G | G ? 1 : 2)
```
这里比较两个函数类型是否可以相互赋值。

### 4. 推导过程示例
情况1：A 和 B 都是 any

```
// A = any, B = any
(<G>() => G extends any ? 1 : 2) extends
(<G>() => G extends any ? 1 : 2)
// 等价于
(() => 1) extends (() => 1) // true
```
情况2：A 是 any ，B 不是 any

```
// A = any, B = string
(<G>() => G extends any ? 1 : 2) extends
(<G>() => G extends G ? 1 : 2)
// 等价于
(() => 1) extends (() => 1) // true，但这不
是我们想要的
```
情况3：A 和 B 都不是 any 且相等

```
// A = string, B = string
(<G>() => G extends G ? 1 : 2) extends
(<G>() => G extends G ? 1 : 2)
// 等价于
(() => 1) extends (() => 1) // true
```
情况4：A 和 B 都不是 any 且不相等

```
// A = string, B = number
(<G>() => G extends G ? 1 : 2) extends
(<G>() => G extends G ? 1 : 2)
// 虽然看起来一样，但由于 A ≠ B，TypeScript 会
认为这两个函数类型不同
// 结果为 false
```
### 5. 为什么这样设计有效？
1. 1.
   利用 any 的特殊性 ： any 类型在交集运算中有特殊行为
2. 2.
   函数类型的结构比较 ：TypeScript 会深度比较函数的返回类型
3. 3.
   泛型参数的约束 ：通过 G extends ... 来触发类型系统的精确比较
### 6. 使用示例
```
type Test1 = IsEqual<string, string>; // 
true
type Test2 = IsEqual<string, number>; // 
false
type Test3 = IsEqual<any, any>; // true
type Test4 = IsEqual<any, string>; // 
false
type Test5 = IsEqual<never, never>; // 
true
```
这是一个非常巧妙的类型编程技巧，利用了 TypeScript 类型系统的内部机制来实现精确的类型相等性检测。
 */
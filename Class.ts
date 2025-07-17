export type Class<T, Args extends unknown[] = any[]> = {
  prototype: Pick<T, keyof T>;
  new (...arguments_: Args): T;
};

/**
### 详细解释
1. 泛型参数：

- T ：表示类实例的类型
- Arguments extends unknown[] = any[] ：表示构造函数参数的类型数组，默认为 any[]
2. 类型结构：

- prototype: Pick<T, keyof T> ：定义类的原型对象，包含类型 T 的所有属性和方法
- new (...arguments_: Arguments): T ：定义构造函数签名，接受 Arguments 类型的参数，返回 T 类型的实例
 */

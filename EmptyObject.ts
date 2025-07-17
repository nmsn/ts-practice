// unique symbol 是 TS的特殊类型，用于表示唯一的符号
declare const emptyObjectSymbol: unique symbol;

export type EmptyObject = {[emptyObjectSymbol]?: never};

export type IsEmptyObject<T> = T extends EmptyObject ? true : false;
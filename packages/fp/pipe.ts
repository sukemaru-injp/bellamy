// Pure function composition utilities following functional programming principles

export const pipe = <T>(value: T) => ({
  then: <U>(fn: (value: T) => U) => pipe(fn(value)),
  valueOf: () => value,
  value
});

// Overloaded pipe function for better TypeScript support
export function compose<A, B>(fn1: (a: A) => B): (a: A) => B;
export function compose<A, B, C>(fn2: (b: B) => C, fn1: (a: A) => B): (a: A) => C;
export function compose<A, B, C, D>(fn3: (c: C) => D, fn2: (b: B) => C, fn1: (a: A) => B): (a: A) => D;
export function compose<A, B, C, D, E>(fn4: (d: D) => E, fn3: (c: C) => D, fn2: (b: B) => C, fn1: (a: A) => B): (a: A) => E;
export function compose<A, B, C, D, E, F>(fn5: (e: E) => F, fn4: (d: D) => E, fn3: (c: C) => D, fn2: (b: B) => C, fn1: (a: A) => B): (a: A) => F;
export function compose(...fns: Array<(arg: any) => any>) {
  return (value: any) => fns.reduceRight((acc, fn) => fn(acc), value);
}

// Left-to-right composition (more intuitive for most developers)
export function flow<A, B>(fn1: (a: A) => B): (a: A) => B;
export function flow<A, B, C>(fn1: (a: A) => B, fn2: (b: B) => C): (a: A) => C;
export function flow<A, B, C, D>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D): (a: A) => D;
export function flow<A, B, C, D, E>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E): (a: A) => E;
export function flow<A, B, C, D, E, F>(fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E, fn5: (e: E) => F): (a: A) => F;
export function flow(...fns: Array<(arg: any) => any>) {
  return (value: any) => fns.reduce((acc, fn) => fn(acc), value);
}

// Currying utilities
export const curry = <T extends readonly unknown[], R>(
  fn: (...args: T) => R
): T extends readonly [infer A, ...infer Rest]
  ? Rest extends readonly []
    ? (a: A) => R
    : (a: A) => (...args: Rest) => R
  : () => R => {
  return ((...args: any[]) => {
    if (args.length >= fn.length) {
      return fn(...(args as T));
    }
    return (...nextArgs: any[]) => curry(fn)(...args, ...nextArgs);
  }) as any;
};

// Partial application utility
export const partial = <T extends readonly unknown[], R>(
  fn: (...args: T) => R,
  ...partialArgs: Partial<T>
) => (...remainingArgs: any[]) => fn(...(partialArgs.concat(remainingArgs) as T));
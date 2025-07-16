// Option/Maybe type for handling nullable values without null/undefined
// Follows functional programming principles with immutable data structures

export type Option<T> = Some<T> | None;

export interface Some<T> {
  readonly _tag: 'Some';
  readonly value: T;
}

export interface None {
  readonly _tag: 'None';
}

// Constructor functions (pure functions)
export const some = <T>(value: T): Some<T> => ({
  _tag: 'Some',
  value
});

export const none: None = {
  _tag: 'None'
};

// Constructor from nullable value (pure function)
export const fromNullable = <T>(value: T | null | undefined): Option<T> =>
  value != null ? some(value) : none;

// Type guards (pure functions)
export const isSome = <T>(option: Option<T>): option is Some<T> =>
  option._tag === 'Some';

export const isNone = <T>(option: Option<T>): option is None =>
  option._tag === 'None';

// Functor: map operation (pure function)
export const map = <T, U>(
  fn: (value: T) => U
) => (option: Option<T>): Option<U> =>
  isSome(option) ? some(fn(option.value)) : none;

// Applicative: apply operation (pure function)
export const apply = <T, U>(
  fnOption: Option<(value: T) => U>
) => (valueOption: Option<T>): Option<U> =>
  isSome(fnOption) && isSome(valueOption)
    ? some(fnOption.value(valueOption.value))
    : none;

// Monad: flatMap operation (pure function)
export const flatMap = <T, U>(
  fn: (value: T) => Option<U>
) => (option: Option<T>): Option<U> =>
  isSome(option) ? fn(option.value) : none;

// Chain alias for flatMap (pure function)
export const chain = flatMap;

// Filter operation (pure function)
export const filter = <T>(
  predicate: (value: T) => boolean
) => (option: Option<T>): Option<T> =>
  isSome(option) && predicate(option.value) ? option : none;

// Fold operation for pattern matching (pure function)
export const fold = <T, R>(
  onNone: () => R,
  onSome: (value: T) => R
) => (option: Option<T>): R =>
  isSome(option) ? onSome(option.value) : onNone();

// Get value or default (pure function)
export const getOrElse = <T>(
  defaultValue: T
) => (option: Option<T>): T =>
  isSome(option) ? option.value : defaultValue;

// Get value or compute default lazily (pure function)
export const getOrElseLazy = <T>(
  getDefaultValue: () => T
) => (option: Option<T>): T =>
  isSome(option) ? option.value : getDefaultValue();

// Convert to nullable value (pure function)
export const toNullable = <T>(option: Option<T>): T | null =>
  isSome(option) ? option.value : null;

// Convert to undefined value (pure function) 
export const toUndefined = <T>(option: Option<T>): T | undefined =>
  isSome(option) ? option.value : undefined;

// Combine two Options with a function (pure function)
export const map2 = <T, U, V>(
  fn: (a: T, b: U) => V
) => (optionA: Option<T>) => (optionB: Option<U>): Option<V> =>
  isSome(optionA) && isSome(optionB)
    ? some(fn(optionA.value, optionB.value))
    : none;

// Convert array of Options to Option of array (pure function)
export const sequence = <T>(options: readonly Option<T>[]): Option<readonly T[]> =>
  options.reduce<Option<readonly T[]>>(
    (acc, option) =>
      isSome(acc) && isSome(option)
        ? some([...acc.value, option.value])
        : none,
    some([] as readonly T[])
  );

// Transform array of values with a function that returns Option
export const traverse = <T, U>(
  fn: (value: T) => Option<U>
) => (values: readonly T[]): Option<readonly U[]> =>
  sequence(values.map(fn));
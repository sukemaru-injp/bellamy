// Immutable array utilities following functional programming principles
// All functions are pure and return new arrays without mutating the original

// Basic array operations (pure functions)
export const head = <T>(array: readonly T[]): T | undefined =>
	array.length > 0 ? array[0] : undefined;

export const tail = <T>(array: readonly T[]): readonly T[] => array.slice(1);

export const last = <T>(array: readonly T[]): T | undefined =>
	array.length > 0 ? array[array.length - 1] : undefined;

export const init = <T>(array: readonly T[]): readonly T[] =>
	array.slice(0, -1);

export const isEmpty = <T>(array: readonly T[]): boolean => array.length === 0;

export const length = <T>(array: readonly T[]): number => array.length;

// Safe indexing (pure function)
export const at =
	<T>(index: number) =>
	(array: readonly T[]): T | undefined =>
		index >= 0 && index < array.length ? array[index] : undefined;

// Immutable array transformations (pure functions)
export const append =
	<T>(item: T) =>
	(array: readonly T[]): readonly T[] => [...array, item];

export const prepend =
	<T>(item: T) =>
	(array: readonly T[]): readonly T[] => [item, ...array];

export const concat =
	<T>(array2: readonly T[]) =>
	(array1: readonly T[]): readonly T[] => [...array1, ...array2];

export const reverse = <T>(array: readonly T[]): readonly T[] =>
	[...array].reverse();

export const sort =
	<T>(compareFn?: (a: T, b: T) => number) =>
	(array: readonly T[]): readonly T[] =>
		[...array].sort(compareFn);

export const sortBy =
	<T, U>(selector: (item: T) => U, compareFn?: (a: U, b: U) => number) =>
	(array: readonly T[]): readonly T[] =>
		[...array].sort((a, b) => {
			const aValue = selector(a);
			const bValue = selector(b);
			return compareFn
				? compareFn(aValue, bValue)
				: aValue < bValue
					? -1
					: aValue > bValue
						? 1
						: 0;
		});

// Array predicates (pure functions)
export const includes =
	<T>(searchItem: T) =>
	(array: readonly T[]): boolean =>
		array.includes(searchItem);

export const some =
	<T>(predicate: (item: T) => boolean) =>
	(array: readonly T[]): boolean =>
		array.some(predicate);

export const every =
	<T>(predicate: (item: T) => boolean) =>
	(array: readonly T[]): boolean =>
		array.every(predicate);

export const find =
	<T>(predicate: (item: T) => boolean) =>
	(array: readonly T[]): T | undefined =>
		array.find(predicate);

export const findIndex =
	<T>(predicate: (item: T) => boolean) =>
	(array: readonly T[]): number =>
		array.findIndex(predicate);

// Array filtering and partitioning (pure functions)
export const filter =
	<T>(predicate: (item: T) => boolean) =>
	(array: readonly T[]): readonly T[] =>
		array.filter(predicate);

export const reject =
	<T>(predicate: (item: T) => boolean) =>
	(array: readonly T[]): readonly T[] =>
		array.filter((item) => !predicate(item));

export const partition =
	<T>(predicate: (item: T) => boolean) =>
	(array: readonly T[]): readonly [readonly T[], readonly T[]] =>
		array.reduce<readonly [readonly T[], readonly T[]]>(
			([passed, failed], item) =>
				predicate(item)
					? [[...passed, item], failed]
					: [passed, [...failed, item]],
			[[], []]
		);

export const take =
	<T>(count: number) =>
	(array: readonly T[]): readonly T[] =>
		array.slice(0, count);

export const drop =
	<T>(count: number) =>
	(array: readonly T[]): readonly T[] =>
		array.slice(count);

export const takeWhile =
	<T>(predicate: (item: T) => boolean) =>
	(array: readonly T[]): readonly T[] => {
		const result: T[] = [];
		for (const item of array) {
			if (!predicate(item)) break;
			result.push(item);
		}
		return result;
	};

// Array transformations (pure functions)
export const map =
	<T, U>(fn: (item: T) => U) =>
	(array: readonly T[]): readonly U[] =>
		array.map(fn);

export const mapWithIndex =
	<T, U>(fn: (item: T, index: number) => U) =>
	(array: readonly T[]): readonly U[] =>
		array.map(fn);

export const flatMap =
	<T, U>(fn: (item: T) => readonly U[]) =>
	(array: readonly T[]): readonly U[] =>
		array.flatMap(fn);

export const flatten = <T>(array: readonly (readonly T[])[]): readonly T[] =>
	array.flatMap((x) => x as readonly T[]);

// Array aggregation (pure functions)
export const reduce =
	<T, U>(fn: (acc: U, item: T) => U, initialValue: U) =>
	(array: readonly T[]): U =>
		array.reduce(fn, initialValue);

export const reduceRight =
	<T, U>(fn: (acc: U, item: T) => U, initialValue: U) =>
	(array: readonly T[]): U =>
		array.reduceRight(fn, initialValue);

export const sum = (array: readonly number[]): number =>
	array.reduce((acc, x) => acc + x, 0);

export const product = (array: readonly number[]): number =>
	array.reduce((acc, x) => acc * x, 1);

export const min = (array: readonly number[]): number | undefined =>
	array.length > 0 ? Math.min(...array) : undefined;

export const max = (array: readonly number[]): number | undefined =>
	array.length > 0 ? Math.max(...array) : undefined;

export const minBy =
	<T>(selector: (item: T) => number) =>
	(array: readonly T[]): T | undefined => {
		if (array.length === 0) return undefined;
		return array.reduce((min, item) =>
			selector(item) < selector(min) ? item : min
		);
	};

export const maxBy =
	<T>(selector: (item: T) => number) =>
	(array: readonly T[]): T | undefined => {
		if (array.length === 0) return undefined;
		return array.reduce((max, item) =>
			selector(item) > selector(max) ? item : max
		);
	};

// Array grouping (pure functions)
export const groupBy =
	<T, K extends string | number | symbol>(selector: (item: T) => K) =>
	(array: readonly T[]): Record<K, readonly T[]> =>
		array.reduce<Record<K, readonly T[]>>(
			(groups, item) => {
				const key = selector(item);
				const existing = groups[key] || [];
				return Object.assign({}, groups, {
					[key]: [...existing, item]
				});
			},
			{} as Record<K, readonly T[]>
		);

export const countBy =
	<T, K extends string | number | symbol>(selector: (item: T) => K) =>
	(array: readonly T[]): Record<K, number> =>
		array.reduce<Record<K, number>>(
			(counts, item) => {
				const key = selector(item);
				return Object.assign({}, counts, {
					[key]: (counts[key] || 0) + 1
				});
			},
			{} as Record<K, number>
		);

// Array deduplication (pure functions)
export const unique = <T>(array: readonly T[]): readonly T[] => [
	...new Set(array)
];

export const uniqueBy =
	<T, K>(selector: (item: T) => K) =>
	(array: readonly T[]): readonly T[] => {
		const seen = new Set<K>();
		return array.filter((item) => {
			const key = selector(item);
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});
	};

// Array set operations (pure functions)
export const union =
	<T>(array2: readonly T[]) =>
	(array1: readonly T[]): readonly T[] =>
		unique([...array1, ...array2]);

export const intersection =
	<T>(array2: readonly T[]) =>
	(array1: readonly T[]): readonly T[] =>
		array1.filter((item) => array2.includes(item));

export const difference =
	<T>(array2: readonly T[]) =>
	(array1: readonly T[]): readonly T[] =>
		array1.filter((item) => !array2.includes(item));

// Array chunking (pure functions)
export const chunk =
	<T>(size: number) =>
	(array: readonly T[]): readonly (readonly T[])[] => {
		if (size <= 0) return [];
		const result: (readonly T[])[] = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	};

// Array zip operations (pure functions)
export const zip =
	<T, U>(array2: readonly U[]) =>
	(array1: readonly T[]): readonly (readonly [T, U])[] => {
		const length = Math.min(array1.length, array2.length);
		const result: (readonly [T, U])[] = [];
		for (let i = 0; i < length; i++) {
			const item1 = array1[i];
			const item2 = array2[i];
			if (item1 !== undefined && item2 !== undefined) {
				result.push([item1, item2]);
			}
		}
		return result;
	};

export const zipWith =
	<T, U, V>(fn: (a: T, b: U) => V) =>
	(array2: readonly U[]) =>
	(array1: readonly T[]): readonly V[] => {
		const length = Math.min(array1.length, array2.length);
		const result: V[] = [];
		for (let i = 0; i < length; i++) {
			const item1 = array1[i];
			const item2 = array2[i];
			if (item1 !== undefined && item2 !== undefined) {
				result.push(fn(item1, item2));
			}
		}
		return result;
	};

// Array utilities for creating arrays (pure functions)
export const range = (
	start: number,
	end: number,
	step = 1
): readonly number[] => {
	const result: number[] = [];
	for (let i = start; i < end; i += step) {
		result.push(i);
	}
	return result;
};

export const repeat = <T>(value: T, count: number): readonly T[] =>
	new Array(count).fill(value);

export const replicate = repeat; // Alias for repeat

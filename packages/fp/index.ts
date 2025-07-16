// Functional programming utilities for Bellamy app
// All utilities follow functional programming principles:
// - Pure functions
// - Immutable data structures
// - No side effects
// - Composable functions

export * from './pipe';
export * from './Result';
export * from './Option';
export * from './Array';

// Re-export commonly used utilities with shorter names
export { pipe, compose, flow, curry, partial } from './pipe';
export {
	Result,
	success,
	failure,
	map as mapResult,
	flatMap as flatMapResult,
	fold as foldResult,
	getOrElse as getOrElseResult,
	tryCatch,
	tryCatchAsync
} from './Result';
export {
	Option,
	some,
	none,
	fromNullable,
	isSome,
	isNone,
	map as mapOption,
	flatMap as flatMapOption,
	fold as foldOption,
	getOrElse as getOrElseOption,
	filter as filterOption
} from './Option';
export {
	map as mapArray,
	filter as filterArray,
	reduce as reduceArray,
	flatMap as flatMapArray,
	head,
	tail,
	last,
	append,
	prepend,
	concat,
	unique,
	groupBy,
	sortBy,
	chunk,
	zip,
	range
} from './Array';

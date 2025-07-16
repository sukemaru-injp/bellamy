// Result type for error handling without exceptions
// Follows functional programming principles with immutable data structures

export type Result<T, E = Error> = Success<T> | Failure<E>;

export interface Success<T> {
	readonly _tag: 'Success';
	readonly value: T;
}

export interface Failure<E> {
	readonly _tag: 'Failure';
	readonly error: E;
}

// Constructor functions (pure functions)
export const success = <T>(value: T): Success<T> => ({
	_tag: 'Success',
	value
});

export const failure = <E>(error: E): Failure<E> => ({
	_tag: 'Failure',
	error
});

// Type guards (pure functions)
export const isSuccess = <T, E>(result: Result<T, E>): result is Success<T> =>
	result._tag === 'Success';

export const isFailure = <T, E>(result: Result<T, E>): result is Failure<E> =>
	result._tag === 'Failure';

// Functor: map operation (pure function)
export const map =
	<T, U, E>(fn: (value: T) => U) =>
	(result: Result<T, E>): Result<U, E> =>
		isSuccess(result) ? success(fn(result.value)) : result;

// Applicative: apply operation (pure function)
export const apply =
	<T, U, E>(fnResult: Result<(value: T) => U, E>) =>
	(valueResult: Result<T, E>): Result<U, E> =>
		isSuccess(fnResult) && isSuccess(valueResult)
			? success(fnResult.value(valueResult.value))
			: isFailure(fnResult)
				? fnResult
				: (valueResult as Failure<E>);

// Monad: flatMap operation (pure function)
export const flatMap =
	<T, U, E>(fn: (value: T) => Result<U, E>) =>
	(result: Result<T, E>): Result<U, E> =>
		isSuccess(result) ? fn(result.value) : result;

// Error handling with mapping (pure function)
export const mapError =
	<T, E1, E2>(fn: (error: E1) => E2) =>
	(result: Result<T, E1>): Result<T, E2> =>
		isFailure(result) ? failure(fn(result.error)) : result;

// Fold operation for pattern matching (pure function)
export const fold =
	<T, E, R>(onSuccess: (value: T) => R, onFailure: (error: E) => R) =>
	(result: Result<T, E>): R =>
		isSuccess(result) ? onSuccess(result.value) : onFailure(result.error);

// Get value or default (pure function)
export const getOrElse =
	<T, E>(defaultValue: T) =>
	(result: Result<T, E>): T =>
		isSuccess(result) ? result.value : defaultValue;

// Chain multiple Results together (pure function)
export const chain =
	<T, U, E>(fn: (value: T) => Result<U, E>) =>
	(result: Result<T, E>): Result<U, E> =>
		flatMap(fn)(result);

// Utility to wrap potentially throwing functions
export const tryCatch = <T, E = Error>(
	fn: () => T,
	onError: (error: unknown) => E = (error) => error as E
): Result<T, E> => {
	try {
		return success(fn());
	} catch (error) {
		return failure(onError(error));
	}
};

// Async version of tryCatch
export const tryCatchAsync = async <T, E = Error>(
	fn: () => Promise<T>,
	onError: (error: unknown) => E = (error) => error as E
): Promise<Result<T, E>> => {
	try {
		const value = await fn();
		return success(value);
	} catch (error) {
		return failure(onError(error));
	}
};

// Collect all successes or return first failure
export const sequence = <T, E>(
	results: readonly Result<T, E>[]
): Result<readonly T[], E> =>
	results.reduce<Result<readonly T[], E>>(
		(acc, result) =>
			isSuccess(acc) && isSuccess(result)
				? success([...acc.value, result.value])
				: isFailure(acc)
					? acc
					: (result as Failure<E>),
		success([] as readonly T[])
	);

// Transform array of values with a function that returns Result
export const traverse =
	<T, U, E>(fn: (value: T) => Result<U, E>) =>
	(values: readonly T[]): Result<readonly U[], E> =>
		sequence(values.map(fn));

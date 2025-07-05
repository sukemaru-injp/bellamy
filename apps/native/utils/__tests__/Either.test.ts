import { describe, expect, it, vi } from 'vitest';
import { Either } from '../Either';

describe('Either', () => {
	describe('Either.left', () => {
		it('should create a Left instance', () => {
			const either = Either.left<string, number>('error');
			expect(either.isLeft()).toBe(true);
			expect(either.isRight()).toBe(false);
		});
	});

	describe('Either.right', () => {
		it('should create a Right instance', () => {
			const either = Either.right<string, number>(42);
			expect(either.isLeft()).toBe(false);
			expect(either.isRight()).toBe(true);
		});
	});

	describe('Either.tryCatch', () => {
		it('should return Right when function succeeds', () => {
			const either = Either.tryCatch(
				() => 42,
				(error) => `Error: ${error}`
			);

			expect(either.isRight()).toBe(true);
			expect(either.getOrElse(0)).toBe(42);
		});

		it('should return Left when function throws', () => {
			const either = Either.tryCatch(
				() => {
					throw new Error('test error');
				},
				(error) => `Error: ${error}`
			);

			expect(either.isLeft()).toBe(true);
			expect(
				either.fold(
					(left) => left,
					(right) => `Right: ${right}`
				)
			).toContain('Error: Error: test error');
		});
	});

	describe('Either.tryCatchAsync', () => {
		it('should return Right when async function succeeds', async () => {
			const either = await Either.tryCatchAsync(
				async () => 42,
				(error) => `Error: ${error}`
			);

			expect(either.isRight()).toBe(true);
			expect(either.getOrElse(0)).toBe(42);
		});

		it('should return Left when async function throws', async () => {
			const either = await Either.tryCatchAsync(
				async () => {
					throw new Error('async error');
				},
				(error) => `Error: ${error}`
			);

			expect(either.isLeft()).toBe(true);
			expect(
				either.fold(
					(left) => left,
					(right) => `Right: ${right}`
				)
			).toContain('Error: Error: async error');
		});

		it('should return Left when async function rejects', async () => {
			const either = await Either.tryCatchAsync(
				async () => Promise.reject(new Error('rejection error')),
				(error) => `Error: ${error}`
			);

			expect(either.isLeft()).toBe(true);
			expect(
				either.fold(
					(left) => left,
					(right) => `Right: ${right}`
				)
			).toContain('Error: Error: rejection error');
		});
	});

	describe('Left methods', () => {
		const leftEither = Either.left<string, number>('error');

		describe('map', () => {
			it('should not transform value when Left', () => {
				const mapped = leftEither.map((x) => x * 2);

				expect(mapped.isLeft()).toBe(true);
				expect(
					mapped.fold(
						(left) => left,
						(right) => `Right: ${right}`
					)
				).toBe('error');
			});
		});

		describe('mapLeft', () => {
			it('should transform left value when Left', () => {
				const mapped = leftEither.mapLeft((error) => `Mapped: ${error}`);

				expect(mapped.isLeft()).toBe(true);
				expect(
					mapped.fold(
						(left) => left,
						(right) => `Right: ${right}`
					)
				).toBe('Mapped: error');
			});
		});

		describe('flatMap', () => {
			it('should not call function when Left', () => {
				const mockFn = vi.fn(() => Either.right<string, string>('success'));
				const result = leftEither.flatMap(mockFn);

				expect(mockFn).not.toHaveBeenCalled();
				expect(result.isLeft()).toBe(true);
				expect(
					result.fold(
						(left) => left,
						(right) => right
					)
				).toBe('error');
			});
		});

		describe('fold', () => {
			it('should call leftF when Left', () => {
				const leftFn = vi.fn((left: string) => `Left: ${left}`);
				const rightFn = vi.fn((right: number) => `Right: ${right}`);

				const result = leftEither.fold(leftFn, rightFn);

				expect(leftFn).toHaveBeenCalledWith('error');
				expect(rightFn).not.toHaveBeenCalled();
				expect(result).toBe('Left: error');
			});
		});

		describe('getOrElse', () => {
			it('should return default value when Left', () => {
				const result = leftEither.getOrElse(99);
				expect(result).toBe(99);
			});
		});

		describe('getOrElseThrow', () => {
			it('should throw default error when Left and no errorF provided', () => {
				expect(() => leftEither.getOrElseThrow()).toThrow('Left value: error');
			});

			it('should throw custom error when Left and errorF provided', () => {
				const errorF = (left: string) => new Error(`Custom error: ${left}`);
				expect(() => leftEither.getOrElseThrow(errorF)).toThrow(
					'Custom error: error'
				);
			});
		});
	});

	describe('Right methods', () => {
		const rightEither = Either.right<string, number>(42);

		describe('map', () => {
			it('should transform value when Right', () => {
				const mapped = rightEither.map((x) => x * 2);

				expect(mapped.isRight()).toBe(true);
				expect(mapped.getOrElse(0)).toBe(84);
			});
		});

		describe('mapLeft', () => {
			it('should not transform left value when Right', () => {
				const mapped = rightEither.mapLeft((error) => `Mapped: ${error}`);

				expect(mapped.isRight()).toBe(true);
				expect(mapped.getOrElse(0)).toBe(42);
			});
		});

		describe('flatMap', () => {
			it('should call function and return result when Right', () => {
				const result = rightEither.flatMap((x) =>
					Either.right<string, string>(`Result: ${x}`)
				);

				expect(result.isRight()).toBe(true);
				expect(result.getOrElse('')).toBe('Result: 42');
			});

			it('should call function and return Left when flatMap returns Left', () => {
				const result = rightEither.flatMap(() =>
					Either.left<string, string>('flatMap error')
				);

				expect(result.isLeft()).toBe(true);
				expect(
					result.fold(
						(left) => left,
						(right) => right
					)
				).toBe('flatMap error');
			});
		});

		describe('fold', () => {
			it('should call rightF when Right', () => {
				const leftFn = vi.fn((left: string) => `Left: ${left}`);
				const rightFn = vi.fn((right: number) => `Right: ${right}`);

				const result = rightEither.fold(leftFn, rightFn);

				expect(leftFn).not.toHaveBeenCalled();
				expect(rightFn).toHaveBeenCalledWith(42);
				expect(result).toBe('Right: 42');
			});
		});

		describe('getOrElse', () => {
			it('should return value when Right', () => {
				const result = rightEither.getOrElse(99);
				expect(result).toBe(42);
			});
		});

		describe('getOrElseThrow', () => {
			it('should return value when Right', () => {
				const result = rightEither.getOrElseThrow();
				expect(result).toBe(42);
			});

			it('should return value when Right even with errorF provided', () => {
				const errorF = (left: string) => new Error(`Custom error: ${left}`);
				const result = rightEither.getOrElseThrow(errorF);
				expect(result).toBe(42);
			});
		});
	});

	describe('Chaining operations', () => {
		it('should chain map operations on Right', () => {
			const result = Either.right<string, number>(5)
				.map((x) => x * 2)
				.map((x) => x + 1)
				.map((x) => x.toString());

			expect(result.isRight()).toBe(true);
			expect(result.getOrElse('')).toBe('11');
		});

		it('should stop chaining on Left', () => {
			const result = Either.left<string, number>('error')
				.map((x) => x * 2)
				.map((x) => x + 1)
				.map((x) => x.toString());

			expect(result.isLeft()).toBe(true);
			expect(
				result.fold(
					(left) => left,
					(right) => right
				)
			).toBe('error');
		});

		it('should chain flatMap operations', () => {
			const divide = (x: number, y: number): Either<string, number> => {
				if (y === 0) return Either.left('Division by zero');
				return Either.right(x / y);
			};

			const result = Either.right<string, number>(20)
				.flatMap((x) => divide(x, 4))
				.flatMap((x) => divide(x, 2));

			expect(result.isRight()).toBe(true);
			expect(result.getOrElse(0)).toBe(2.5);
		});

		it('should handle error in flatMap chain', () => {
			const divide = (x: number, y: number): Either<string, number> => {
				if (y === 0) return Either.left('Division by zero');
				return Either.right(x / y);
			};

			const result = Either.right<string, number>(20)
				.flatMap((x) => divide(x, 4))
				.flatMap((x) => divide(x, 0))
				.flatMap((x) => divide(x, 2));

			expect(result.isLeft()).toBe(true);
			expect(
				result.fold(
					(left) => left,
					(right) => right.toString()
				)
			).toBe('Division by zero');
		});
	});

	describe('Type guards', () => {
		it('should correctly identify Left instance', () => {
			const either = Either.left<string, number>('error');

			if (either.isLeft()) {
				// TypeScript should infer this as Left<string, number>
				expect(
					either.fold(
						(left) => left,
						(right) => right.toString()
					)
				).toBe('error');
			} else {
				// This should not be reached
				expect(true).toBe(false);
			}
		});

		it('should correctly identify Right instance', () => {
			const either = Either.right<string, number>(42);

			if (either.isRight()) {
				// TypeScript should infer this as Right<string, number>
				expect(either.getOrElse(0)).toBe(42);
			} else {
				// This should not be reached
				expect(true).toBe(false);
			}
		});
	});
});

import { describe, expect, it, vi } from 'vitest';
import { Option } from '../Option';

describe('Option', () => {
	describe('Option.some', () => {
		it('should create a Some instance', () => {
			const option = Option.some(42);
			expect(option.isSome()).toBe(true);
			expect(option.isNone()).toBe(false);
		});
	});

	describe('Option.none', () => {
		it('should create a None instance', () => {
			const option = Option.none<number>();
			expect(option.isSome()).toBe(false);
			expect(option.isNone()).toBe(true);
		});
	});

	describe('Option.fromNullable', () => {
		it('should create Some when value is not null/undefined', () => {
			const option1 = Option.fromNullable(42);
			const option2 = Option.fromNullable('hello');
			const option3 = Option.fromNullable(0);
			const option4 = Option.fromNullable('');

			expect(option1.isSome()).toBe(true);
			expect(option2.isSome()).toBe(true);
			expect(option3.isSome()).toBe(true);
			expect(option4.isSome()).toBe(true);
		});

		it('should create None when value is null or undefined', () => {
			const option1 = Option.fromNullable(null);
			const option2 = Option.fromNullable(undefined);

			expect(option1.isNone()).toBe(true);
			expect(option2.isNone()).toBe(true);
		});
	});

	describe('map', () => {
		it('should transform value when Some', () => {
			const option = Option.some(5);
			const mapped = option.map((x) => x * 2);

			expect(mapped.isSome()).toBe(true);
			expect(mapped.getOrElse(0)).toBe(10);
		});

		it('should not transform when None', () => {
			const option = Option.none<number>();
			const mapped = option.map((x) => x * 2);

			expect(mapped.isNone()).toBe(true);
		});
	});

	describe('flatMap', () => {
		it('should flatten nested Options when Some', () => {
			const option = Option.some(5);
			const flatMapped = option.flatMap((x) => Option.some(x * 2));

			expect(flatMapped.isSome()).toBe(true);
			expect(flatMapped.getOrElse(0)).toBe(10);
		});

		it('should return None when flatMap returns None', () => {
			const option = Option.some(5);
			const flatMapped = option.flatMap((_) => Option.none<number>());

			expect(flatMapped.isNone()).toBe(true);
		});

		it('should not execute function when None', () => {
			const option = Option.none<number>();
			const mockFn = vi.fn();
			const flatMapped = option.flatMap(mockFn);

			expect(flatMapped.isNone()).toBe(true);
			expect(mockFn).not.toHaveBeenCalled();
		});
	});

	describe('filter', () => {
		it('should keep value when predicate is true', () => {
			const option = Option.some(10);
			const filtered = option.filter((x) => x > 5);

			expect(filtered.isSome()).toBe(true);
			expect(filtered.getOrElse(0)).toBe(10);
		});

		it('should return None when predicate is false', () => {
			const option = Option.some(3);
			const filtered = option.filter((x) => x > 5);

			expect(filtered.isNone()).toBe(true);
		});

		it('should return None when already None', () => {
			const option = Option.none<number>();
			const filtered = option.filter((x) => x > 5);

			expect(filtered.isNone()).toBe(true);
		});
	});

	describe('getOrElse', () => {
		it('should return value when Some', () => {
			const option = Option.some(42);
			const result = option.getOrElse(0);

			expect(result).toBe(42);
		});

		it('should return default value when None', () => {
			const option = Option.none<number>();
			const result = option.getOrElse(100);

			expect(result).toBe(100);
		});
	});

	describe('getOrElseThrow', () => {
		it('should return value when Some', () => {
			const option = Option.some(42);
			const result = option.getOrElseThrow();

			expect(result).toBe(42);
		});

		it('should throw default error when None', () => {
			const option = Option.none<number>();

			expect(() => option.getOrElseThrow()).toThrow('Option is None');
		});

		it('should throw custom error when None', () => {
			const option = Option.none<number>();
			const customError = new Error('Custom error message');

			expect(() => option.getOrElseThrow(customError)).toThrow(
				'Custom error message'
			);
		});
	});

	describe('chaining operations', () => {
		it('should chain multiple operations correctly', () => {
			const result = Option.some(5)
				.map((x) => x * 2)
				.filter((x) => x > 5)
				.flatMap((x) => Option.some(x + 1))
				.getOrElse(0);

			expect(result).toBe(11);
		});

		it('should short-circuit on None', () => {
			const result = Option.some(2)
				.map((x) => x * 2)
				.filter((x) => x > 5)
				.flatMap((x) => Option.some(x + 1))
				.getOrElse(0);

			expect(result).toBe(0);
		});
	});
});

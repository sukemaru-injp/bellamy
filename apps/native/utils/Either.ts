export abstract class Either<L, R> {
	abstract isLeft(): this is Left<L, R>;
	abstract isRight(): this is Right<L, R>;

	abstract map<U>(f: (value: R) => U): Either<L, U>;
	abstract mapLeft<U>(f: (value: L) => U): Either<U, R>;
	abstract flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U>;
	abstract fold<U>(leftF: (left: L) => U, rightF: (right: R) => U): U;
	abstract getOrElse(defaultValue: R): R;
	abstract getOrElseThrow(errorF?: (left: L) => Error): R;

	static left<L, R>(value: L): Either<L, R> {
		return new Left<L, R>(value);
	}

	static right<L, R>(value: R): Either<L, R> {
		return new Right<L, R>(value);
	}

	static tryCatch<L, R>(
		f: () => R,
		onError: (error: unknown) => L
	): Either<L, R> {
		try {
			return Either.right(f());
		} catch (error) {
			return Either.left(onError(error));
		}
	}

	static async tryCatchAsync<L, R>(
		f: () => Promise<R>,
		onError: (error: unknown) => L
	): Promise<Either<L, R>> {
		try {
			const result = await f();
			return Either.right(result);
		} catch (error) {
			return Either.left(onError(error));
		}
	}
}

class Left<L, R> extends Either<L, R> {
	constructor(private readonly value: L) {
		super();
	}

	isLeft(): this is Left<L, R> {
		return true;
	}

	isRight(): this is Right<L, R> {
		return false;
	}

	map<U>(_f: (value: R) => U): Either<L, U> {
		return new Left<L, U>(this.value);
	}

	mapLeft<U>(f: (value: L) => U): Either<U, R> {
		return new Left<U, R>(f(this.value));
	}

	flatMap<U>(_f: (value: R) => Either<L, U>): Either<L, U> {
		return new Left<L, U>(this.value);
	}

	fold<U>(leftF: (left: L) => U, _rightF: (right: R) => U): U {
		return leftF(this.value);
	}

	getOrElse(defaultValue: R): R {
		return defaultValue;
	}

	getOrElseThrow(errorF?: (left: L) => Error): R {
		const error = errorF
			? errorF(this.value)
			: new Error(`Left value: ${this.value}`);
		throw error;
	}
}

class Right<L, R> extends Either<L, R> {
	constructor(private readonly value: R) {
		super();
	}

	isLeft(): this is Left<L, R> {
		return false;
	}

	isRight(): this is Right<L, R> {
		return true;
	}

	map<U>(f: (value: R) => U): Either<L, U> {
		return new Right<L, U>(f(this.value));
	}

	mapLeft<U>(_f: (value: L) => U): Either<U, R> {
		return new Right<U, R>(this.value);
	}

	flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U> {
		return f(this.value);
	}

	fold<U>(_leftF: (left: L) => U, rightF: (right: R) => U): U {
		return rightF(this.value);
	}

	getOrElse(_defaultValue: R): R {
		return this.value;
	}

	getOrElseThrow(_errorF?: (left: L) => Error): R {
		return this.value;
	}
}
